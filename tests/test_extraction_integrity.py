import os
import json
import hashlib
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

class TestExtractionIntegrity(unittest.TestCase):

    def test_manifest_assets_exist_and_match_hash(self):
        """Verify that every asset recorded in the manifest exists and matches its SHA-256."""
        manifest_path = os.path.join(ROOT_DIR, "src/data/download_manifest.json")
        self.assertTrue(os.path.exists(manifest_path), "Download manifest must exist")

        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)

        self.assertGreaterEqual(len(manifest), 15, "At least 15 assets must be tracked")

        for item in manifest:
            local_path = os.path.join(ROOT_DIR, item["local_path"])
            self.assertTrue(os.path.exists(local_path), f"File {item['local_path']} must exist locally")
            
            with open(local_path, "rb") as f:
                data = f.read()
            
            actual_size = len(data)
            actual_sha256 = hashlib.sha256(data).hexdigest()

            self.assertEqual(actual_size, item["size_bytes"], f"Size mismatch for {item['local_path']}")
            self.assertEqual(actual_sha256, item["sha256"], f"Hash mismatch for {item['local_path']}")

    def test_works_catalog_schema(self):
        """Verify that the works catalog has 7 complete entries with all required keys."""
        works_path = os.path.join(ROOT_DIR, "src/data/works.json")
        self.assertTrue(os.path.exists(works_path))

        with open(works_path, "r", encoding="utf-8") as f:
            works = json.load(f)

        self.assertEqual(len(works), 7, "Works catalog must contain exactly 7 portfolio entries")
        
        required_keys = {"id", "name", "href", "year", "role", "summary", "highlights", "stack"}
        for work in works:
            self.assertTrue(required_keys.issubset(work.keys()), f"Missing keys in work {work.get('name')}")
            self.assertIsInstance(work["highlights"], list)
            self.assertIsInstance(work["stack"], list)
            self.assertGreater(len(work["stack"]), 0)

    def test_site_content_structure(self):
        """Verify that site_content.json has all panels and required metadata."""
        content_path = os.path.join(ROOT_DIR, "src/data/site_content.json")
        self.assertTrue(os.path.exists(content_path))

        with open(content_path, "r", encoding="utf-8") as f:
            content = json.load(f)

        self.assertIn("site", content)
        self.assertIn("concept", content)
        self.assertIn("sections", content)
        sections = content["sections"]
        for key in ["hero", "about", "services", "autumn", "works", "contact", "finale", "secret_earth_easter_egg"]:
            self.assertIn(key, sections)

    def test_shaders_exist(self):
        """Verify extracted GLSL shader files exist and have non-trivial content."""
        shader_files = [
            "src/shaders/postprocessing_finish.frag.glsl",
            "src/shaders/secret_earth_clouds.frag.glsl",
            "src/shaders/ocean_dunes_caustics.frag.glsl",
            "src/shaders/underwater_bubbles.frag.glsl"
        ]
        for rel_path in shader_files:
            full_path = os.path.join(ROOT_DIR, rel_path)
            self.assertTrue(os.path.exists(full_path), f"Shader {rel_path} must exist")
            self.assertGreater(os.path.getsize(full_path), 100, f"Shader {rel_path} must have content")

    def test_documentation_and_spec_files_exist(self):
        """Verify that mandatory documentation files exist."""
        required_docs = [
            "docs/ARCHITECTURE.md",
            "docs/TECH_STACK_BREAKDOWN.md",
            "docs/ASSETS_INVENTORY.md",
            "docs/MOTION_AND_INTERACTIONS.md",
            "docs/DATA_AND_CONTENT_SPEC.md",
            "docs/NETWORK_AND_SECURITY_ANALYSIS.md",
            "docs/01_PRD.md",
            "docs/02_AppFlow.md",
            "docs/03_UI_Spec.md",
            "docs/04_TRD.md",
            "docs/05_Schema.md",
            "docs/06_Plan.md",
            "CLAUDE.md",
            ".cursorrules",
            "specs/junkbranding_reverse_engineering.md",
            "config/policies.yaml",
            ".env.example",
            ".env"
        ]
        for rel_doc in required_docs:
            full_path = os.path.join(ROOT_DIR, rel_doc)
            self.assertTrue(os.path.exists(full_path), f"Required file {rel_doc} must exist")
            self.assertGreater(os.path.getsize(full_path), 50, f"File {rel_doc} must not be empty")

if __name__ == "__main__":
    unittest.main()
