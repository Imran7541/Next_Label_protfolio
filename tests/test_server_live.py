import unittest
import urllib.request
import urllib.error
import json
import subprocess
import time
import os
import signal

SERVER_PORT = 3891
BASE_URL = f"http://127.0.0.1:{SERVER_PORT}"

class TestLiveServer(unittest.TestCase):
    server_process = None

    @classmethod
    def setUpClass(cls):
        env = os.environ.copy()
        env["PORT"] = str(SERVER_PORT)
        cls.server_process = subprocess.Popen(
            ["node", "server.js"],
            cwd=os.path.abspath(os.path.join(os.path.dirname(__file__), "..")),
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        # Give server time to bind
        time.sleep(1.5)

    @classmethod
    def tearDownClass(cls):
        if cls.server_process:
            cls.server_process.send_signal(signal.SIGTERM)
            cls.server_process.wait(timeout=5)

    def test_01_homepage_served(self):
        """Verify GET / returns 200 with HTML content and security headers."""
        req = urllib.request.Request(f"{BASE_URL}/")
        with urllib.request.urlopen(req, timeout=5) as resp:
            self.assertEqual(resp.status, 200)
            self.assertIn("text/html", resp.headers.get("Content-Type", ""))
            self.assertIn("Content-Security-Policy", resp.headers)
            self.assertEqual(resp.headers.get("X-Frame-Options"), "DENY")
            body = resp.read().decode("utf-8")
            self.assertIn("Imran Hossain", body)
            self.assertIn("Next Label", body)
            self.assertIn("data-stage", body)

    def test_02_video_range_streaming(self):
        """Verify video streaming returns 206 Partial Content when Range header is provided."""
        req = urllib.request.Request(f"{BASE_URL}/videos/toplace.mp4")
        req.add_header("Range", "bytes=0-1023")
        with urllib.request.urlopen(req, timeout=5) as resp:
            self.assertEqual(resp.status, 206)
            self.assertEqual(resp.headers.get("Content-Length"), "1024")
            self.assertIn("bytes 0-1023/", resp.headers.get("Content-Range", ""))
            chunk = resp.read()
            self.assertEqual(len(chunk), 1024)

    def test_03_music_range_streaming(self):
        """Verify audio streaming returns 206 Partial Content when Range header is provided."""
        req = urllib.request.Request(f"{BASE_URL}/music/out_of_flux_blue_race.mp3")
        req.add_header("Range", "bytes=0-2047")
        with urllib.request.urlopen(req, timeout=5) as resp:
            self.assertEqual(resp.status, 206)
            self.assertEqual(resp.headers.get("Content-Length"), "2048")
            chunk = resp.read()
            self.assertEqual(len(chunk), 2048)

    def test_04_js_bundles_served(self):
        """Verify JS production chunks are served with correct MIME type."""
        for chunk in ["/assets/index-BG4wa0Rg.js", "/assets/SecretEarthPage-DeCha5-M.js", "/assets/index-Bc3k1I4L.css"]:
            req = urllib.request.Request(f"{BASE_URL}{chunk}")
            with urllib.request.urlopen(req, timeout=5) as resp:
                self.assertEqual(resp.status, 200)
                data = resp.read()
                self.assertGreater(len(data), 1000)

    def test_05_contact_api_bot_honeypot_rejection(self):
        """Verify bot honeypot populated submission is rejected with 400."""
        payload = json.dumps({
            "name": "Bot Hunter",
            "email": "bot@test.com",
            "message": "This should be immediately rejected because honeypot is populated.",
            "company_website": "spam-link.com",
            "elapsed": 10000
        }).encode("utf-8")

        req = urllib.request.Request(
            f"{BASE_URL}/api/contact",
            data=payload,
            headers={"Content-Type": "application/json"}
        )

        with self.assertRaises(urllib.error.HTTPError) as ctx:
            urllib.request.urlopen(req, timeout=5)
        self.assertEqual(ctx.exception.code, 400)

    def test_06_contact_api_bot_timing_rejection(self):
        """Verify submission taking < 3000ms is rejected as automated bot."""
        payload = json.dumps({
            "name": "Quick Script",
            "email": "quick@test.com",
            "message": "This is a legitimate-looking message but sent in 500ms.",
            "company_website": "",
            "elapsed": 500
        }).encode("utf-8")

        req = urllib.request.Request(
            f"{BASE_URL}/api/contact",
            data=payload,
            headers={"Content-Type": "application/json"}
        )

        with self.assertRaises(urllib.error.HTTPError) as ctx:
            urllib.request.urlopen(req, timeout=5)
        self.assertEqual(ctx.exception.code, 400)

    def test_07_contact_api_valid_submission(self):
        """Verify human inquiry submission succeeds with 200 OK and registers in inquiries."""
        payload = json.dumps({
            "name": "Kenji Sato",
            "email": "kenji.sato@example.co.jp",
            "message": "新規ブランドサイトのWebGLアニメーションとUI実装について相談させてください。",
            "company_website": "",
            "elapsed": 9200
        }).encode("utf-8")

        req = urllib.request.Request(
            f"{BASE_URL}/api/contact",
            data=payload,
            headers={"Content-Type": "application/json"}
        )

        with urllib.request.urlopen(req, timeout=5) as resp:
            self.assertEqual(resp.status, 200)
            data = json.loads(resp.read().decode("utf-8"))
            self.assertTrue(data.get("success"))

    def test_08_path_traversal_dot_env_blocked(self):
        """Verify requesting /.env returns 404 to prevent sensitive credential disclosure."""
        req = urllib.request.Request(f"{BASE_URL}/.env")
        with self.assertRaises(urllib.error.HTTPError) as ctx:
            urllib.request.urlopen(req, timeout=5)
        self.assertEqual(ctx.exception.code, 404)

    def test_09_path_traversal_package_json_blocked(self):
        """Verify requesting /package.json or /server.js returns 404."""
        for target in ["/package.json", "/server.js", "/src/data/inquiries.json", "/../server.js"]:
            req = urllib.request.Request(f"{BASE_URL}{target}")
            with self.assertRaises(urllib.error.HTTPError) as ctx:
                urllib.request.urlopen(req, timeout=5)
            self.assertEqual(ctx.exception.code, 404)

    def test_10_stored_xss_payload_rejected(self):
        """Verify contact form rejects HTML / script tags with 400 Bad Request."""
        payload = json.dumps({
            "name": "<script>alert(1)</script>",
            "email": "hacker@test.com",
            "message": "<img src=x onerror=alert('xss')> legitimate looking message exceeding 20 chars.",
            "company_website": "",
            "elapsed": 5000
        }).encode("utf-8")

        req = urllib.request.Request(
            f"{BASE_URL}/api/contact",
            data=payload,
            headers={"Content-Type": "application/json"}
        )
        with self.assertRaises(urllib.error.HTTPError) as ctx:
            urllib.request.urlopen(req, timeout=5)
        self.assertEqual(ctx.exception.code, 400)

    def test_11_hsts_and_security_headers_present(self):
        """Verify HSTS, X-Content-Type-Options, and CSP headers are present."""
        req = urllib.request.Request(f"{BASE_URL}/")
        with urllib.request.urlopen(req, timeout=5) as resp:
            self.assertEqual(resp.status, 200)
            self.assertIn("Strict-Transport-Security", resp.headers)
            self.assertEqual(resp.headers.get("X-Content-Type-Options"), "nosniff")
            self.assertEqual(resp.headers.get("X-XSS-Protection"), "0")

    def test_12_favicon_32_and_apple_touch_icon_exist(self):
        """Verify favicon-32.png and apple-touch-icon.png return 200 OK without 404."""
        for asset in ["/favicon-32.png", "/apple-touch-icon.png", "/favicon.svg", "/robots.txt"]:
            req = urllib.request.Request(f"{BASE_URL}{asset}")
            with urllib.request.urlopen(req, timeout=5) as resp:
                self.assertEqual(resp.status, 200)

    def test_13_bilingual_language_switcher_and_zero_japanese(self):
        """Verify default language is English, two-step loader language choice exists, and zero Japanese characters exist in index.html."""
        import re
        req = urllib.request.Request(f"{BASE_URL}/")
        with urllib.request.urlopen(req, timeout=5) as resp:
            self.assertEqual(resp.status, 200)
            body = resp.read().decode("utf-8")
            self.assertIn('<html lang="en">', body)
            self.assertIn('data-loader-step="sound"', body)
            self.assertIn('data-loader-step="lang"', body)
            self.assertIn('data-enter-lang="en"', body)
            self.assertIn('data-enter-lang="bn"', body)
            jp_matches = re.findall(r'[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+', body)
            self.assertEqual(len(jp_matches), 0, f"Found unexpected Japanese tokens: {jp_matches}")

        i18n_req = urllib.request.Request(f"{BASE_URL}/assets/i18n.js")
        with urllib.request.urlopen(i18n_req, timeout=5) as resp:
            self.assertEqual(resp.status, 200)
            i18n_body = resp.read().decode("utf-8")
            self.assertIn("setPortfolioLanguage", i18n_body)
            self.assertIn("বাংলা", i18n_body)

if __name__ == "__main__":
    unittest.main()
