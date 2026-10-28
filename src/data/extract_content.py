import json

content = {
    "site": {
        "title": "JUNKBRANDING | Mix the unexpected.",
        "description": "クラゲと花を混ぜるように、異なる領域を混ぜて新しいブランド体験をつくるデザインスタジオ。",
        "canonical": "https://www.junkbranding.com/",
        "author": "JUNKBRANDING DESIGN STUDIO",
        "themeColor": "#03050a",
        "locale": "ja_JP",
        "ogImage": "https://www.junkbranding.com/og.jpg"
    },
    "concept": {
        "theme": "深海にも四季がある (Even the deep sea has four seasons)",
        "narrative": "A digital journey moving through Spring (Sakura & Jellyfish morph), Summer (Hanabi fireworks network), Autumn (Momiji foliage fall), Winter (Snow fall & Deep-sea ocean floor), and an outer space Low-Earth Orbit finale."
    },
    "sections": {
        "hero": {
            "panel": "hero",
            "season": "春 (Spring)",
            "label": "Jellyfish × Beautiful flower",
            "heading": "きれいなだけでは終わらない。見た瞬間、触れた瞬間に何かが残る。そんなWebをつくっています。",
            "subheading": "We craft web experiences that linger."
        },
        "about": {
            "panel": "about",
            "season": "春 (Spring)",
            "label": "春 About",
            "heading": "深海にも四季がある",
            "portrait": "/images/face.webp",
            "description": "JUNKBRANDINGは、見えない細部まで設計し、ブランドの体験をかたちにするWebのクリエイティブスタジオです。デザイン、WebGL、SPA、アプリ、CMS構築、SEO、運用まで。"
        },
        "services": {
            "panel": "services",
            "season": "夏 (Summer)",
            "label": "夏 Services",
            "heading": "企画・デザインから開発、公開後の運用まで。",
            "offerings": [
                {
                    "title": "Creative Web / WebGL Experience",
                    "description": "WebGL、Three.js、シェーダー、物理演算を活用した体験型Webサイトの制作。"
                },
                {
                    "title": "Brand Corporate Sites",
                    "description": "ブランドの哲学を視覚と触覚に訴えるコーポレートサイトの企画・設計。"
                },
                {
                    "title": "Interactive Application & Sensor APIs",
                    "description": "Camera API、Hand Tracking、Web Audioを活用した新しいインタラクションの実装。"
                },
                {
                    "title": "Technical Performance & Maintenance",
                    "description": "Core Web Vitals、アクセシビリティ（a11y）、SEO、保守運用まで一貫した品質管理。"
                }
            ]
        },
        "autumn": {
            "panel": "autumn",
            "season": "秋 (Autumn)",
            "label": "秋 Works",
            "heading": "これまでの仕事から、7件。"
        },
        "works": {
            "panel": "works",
            "season": "秋 (Autumn)",
            "item_count": 7,
            "refer_to": "src/data/works.json"
        },
        "contact": {
            "panel": "contact",
            "season": "冬 (Winter)",
            "label": "冬 Contact",
            "heading": "新規制作、リニューアル、運用のご相談をお待ちしています。",
            "form": {
                "action": "/api/contact",
                "method": "POST",
                "fields": {
                    "name": {"type": "text", "minlength": 2, "maxlength": 60, "required": True},
                    "email": {"type": "email", "maxlength": 254, "required": True},
                    "message": {"type": "textarea", "minlength": 20, "maxlength": 1200, "required": True},
                    "company_website": {"type": "text", "honeypot": True, "required": False}
                },
                "protection": {
                    "honeypot": "Hidden company_website field",
                    "timingValidation": "Checks elapsed form fill time against minFillMs to stop bots",
                    "rateLimiting": "sentRecently() local throttle and backend limits"
                }
            }
        },
        "finale": {
            "panel": "finale",
            "owned_sites": [
                {
                    "name": "くらし支援ナビ",
                    "url": "https://fukushi.junkbranding.com/",
                    "description": "困りごとと地域から、公的な相談先を探せる案内サイト。"
                },
                {
                    "name": "Creative Dev Blog",
                    "url": "https://lab.junkbranding.com/",
                    "description": "アニメーションやインタラクションの実装を発信するブログ。"
                },
                {
                    "name": "HP制作専門スクール「0→1」",
                    "url": "https://school.junkbranding.com/",
                    "description": "未経験から、ホームページの企画・制作・公開・運用まで学ぶスクール。"
                }
            ],
            "sister_sites": [
                {
                    "name": "JUNKBRANDING Hand Version (HAND)",
                    "url": "https://hand.junkbranding.com/",
                    "tech": "Hand tracking, Camera API, Web Audio"
                },
                {
                    "name": "JUNKBRANDING Funky Version (FUNKY)",
                    "url": "https://funky.junkbranding.com/",
                    "tech": "Next.js, React, WebGL"
                }
            ]
        },
        "secret_earth_easter_egg": {
            "trigger": "Form submission success (junkbranding:reveal-earth)",
            "dialogId": "secret-earth",
            "title": "Thank you.",
            "lead": "送信しました。ご相談ありがとうございます。",
            "body": "担当者より、ご入力のメールアドレスへご連絡します。深海から送ったメッセージは、いま地球の上にあります。",
            "canvasScene": "Procedural 3D Earth in low orbit with Triplanar Noise Clouds and Fresnel atmosphere."
        }
    }
}

with open("src/data/site_content.json", "w", encoding="utf-8") as f:
    json.dump(content, f, indent=2, ensure_ascii=False)

print("Generated src/data/site_content.json successfully")
