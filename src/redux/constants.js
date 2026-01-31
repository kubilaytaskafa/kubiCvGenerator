export const LANGUAGES = [
  { value: "tr", label: "Türkçe" },
  { value: "en", label: "İngilizce" },
  { value: "de", label: "Almanca" },
  { value: "fr", label: "Fransızca" },
  { value: "es", label: "İspanyolca" },
  { value: "it", label: "İtalyanca" },
  { value: "ru", label: "Rusça" },
  { value: "ar", label: "Arapça" },
  { value: "ja", label: "Japonca" },
  { value: "zh", label: "Çince" },
];

// Dil Seviyeleri (Eğer kullanıcının seviye seçmesini de isterseniz)
export const LANGUAGE_LEVELS = [
  { value: "A1", label: "A1 - Başlangıç" },
  { value: "A2", label: "A2 - Temel" },
  { value: "B1", label: "B1 - Orta" },
  { value: "B2", label: "B2 - İyi" },
  { value: "C1", label: "C1 - İleri" },
  { value: "C2", label: "C2 - Yetkin (Ana Dil Seviyesi)" },
  { value: "native", label: "Ana Dil" },
];

// --- PROGRAMLAMA DİLLERİ & BETİK DİLLERİ ---
export const PROGRAMMING_LANGUAGES = [
  // Popüler & Modern
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C# (.NET)" },
  { value: "go", label: "Go (Golang)" },
  { value: "rust", label: "Rust" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "dart", label: "Dart" },

  // C Ailesi & Sistem
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "objective_c", label: "Objective-C" },
  { value: "assembly", label: "Assembly" },

  // Web & Markup (Genelde bu başlıkta aranır)
  { value: "html", label: "HTML5" },
  { value: "css", label: "CSS3" },
  { value: "sass", label: "Sass/SCSS" },
  { value: "graphql", label: "GraphQL" },

  // Scripting & Shell
  { value: "bash", label: "Bash / Shell" },
  { value: "powershell", label: "PowerShell" },
  { value: "perl", label: "Perl" },
  { value: "lua", label: "Lua" },

  // Backend & Veri Odaklı
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "sql", label: "SQL" },
  { value: "plsql", label: "PL/SQL" },
  { value: "tsql", label: "T-SQL" },
  { value: "nosql", label: "NoSQL" },

  // Data Science & Akademik
  { value: "r", label: "R" },
  { value: "matlab", label: "MATLAB" },
  { value: "julia", label: "Julia" },
  { value: "scala", label: "Scala" },

  // Fonksiyonel & Niş
  { value: "haskell", label: "Haskell" },
  { value: "elixir", label: "Elixir" },
  { value: "erlang", label: "Erlang" },
  { value: "clojure", label: "Clojure" },
  { value: "fsharp", label: "F#" },
  { value: "ocaml", label: "OCaml" },
  { value: "fortran", label: "Fortran" },
  { value: "cobol", label: "COBOL" },
  { value: "ada", label: "Ada" },
  { value: "vba", label: "VBA (Visual Basic)" },
  { value: "solidity", label: "Solidity (Blockchain)" },
];

// --- GELİŞTİRME ALANLARI (ÜNVANLAR & UZMANLIKLAR) ---
export const DEVELOPMENT_AREAS = [
  // Web
  { value: "frontend", label: "Frontend Development" },
  { value: "backend", label: "Backend Development" },
  { value: "fullstack", label: "Full Stack Development" },
  { value: "web_arch", label: "Web Architecture" },

  // Mobil
  { value: "mobile_ios", label: "iOS Development" },
  { value: "mobile_android", label: "Android Development" },
  { value: "mobile_cross", label: "Cross-Platform Mobile Dev (Flutter/RN)" },

  // Altyapı & Operasyon
  { value: "devops", label: "DevOps Engineering" },
  { value: "sre", label: "Site Reliability Engineering (SRE)" },
  { value: "cloud_arch", label: "Cloud Architecture (AWS/Azure/GCP)" },
  { value: "sysadmin", label: "System Administration" },
  { value: "secops", label: "DevSecOps" },

  // Veri & Yapay Zeka
  { value: "datascience", label: "Data Science" },
  { value: "data_eng", label: "Data Engineering" },
  { value: "data_analyst", label: "Data Analysis" },
  { value: "ai_ml", label: "Artificial Intelligence & Machine Learning" },
  { value: "nlp", label: "Natural Language Processing (NLP)" },
  { value: "cv", label: "Computer Vision" },

  // Oyun & Grafik
  { value: "gamedev", label: "Game Development" },
  { value: "graphics", label: "Computer Graphics & Rendering" },
  { value: "ar_vr", label: "AR/VR/XR Development" },

  // Güvenlik
  { value: "cybersecurity", label: "Cyber Security" },
  { value: "pentester", label: "Penetration Testing" },
  { value: "cryptography", label: "Cryptography" },

  // Sistem & Donanım
  { value: "embedded", label: "Embedded Systems" },
  { value: "iot", label: "Internet of Things (IoT)" },
  { value: "robotics", label: "Robotics" },
  { value: "firmware", label: "Firmware Engineering" },

  // Kurumsal & Diğer
  { value: "blockchain", label: "Blockchain & Web3" },
  { value: "erp_crm", label: "ERP/CRM Development (SAP, Salesforce)" },
  { value: "qa_automation", label: "QA Automation Engineer" },
  { value: "qa_manual", label: "Manual Testing / QA" },
  { value: "ui_ux", label: "UI/UX Design" },
  { value: "product_mgmt", label: "Product Management" },
  { value: "tech_lead", label: "Technical Leadership / Engineering Manager" },
];

// --- VERSİYON KONTROL & KAYNAK YÖNETİMİ ---
export const VERSION_CONTROL = [
  // Sistemler
  { value: "git", label: "Git" },
  { value: "svn", label: "SVN (Subversion)" },
  { value: "mercurial", label: "Mercurial (Hg)" },
  { value: "tfs", label: "TFS (Team Foundation Server)" },
  { value: "perforce", label: "Perforce (Helix Core) - Game Dev" },
  { value: "plasticscm", label: "Plastic SCM" },
  { value: "cvs", label: "CVS" },
  { value: "bitkeeper", label: "BitKeeper" },

  // Platformlar (Genelde CV'de yetenek olarak eklenir)
  { value: "github", label: "GitHub" },
  { value: "gitlab", label: "GitLab" },
  { value: "bitbucket", label: "Bitbucket" },
  { value: "azure_repos", label: "Azure Repos" },
  { value: "aws_codecommit", label: "AWS CodeCommit" },
];

// --- PROJE YÖNETİMİ & İŞ BİRLİĞİ ARAÇLARI ---
export const PROJECT_MANAGEMENT = [
  // Agile/Sprint Odaklı
  { value: "jira", label: "Jira Software" },
  { value: "linear", label: "Linear" },
  { value: "asana", label: "Asana" },
  { value: "trello", label: "Trello" },
  { value: "azure_boards", label: "Azure DevOps Boards" },
  { value: "youtrack", label: "YouTrack" },
  { value: "rally", label: "Rally" },

  // Dokümantasyon & Workspace
  { value: "notion", label: "Notion" },
  { value: "confluence", label: "Confluence" },
  { value: "coda", label: "Coda" },
  { value: "sharepoint", label: "SharePoint" },

  // Genel Yönetim & Takip
  { value: "monday", label: "Monday.com" },
  { value: "clickup", label: "ClickUp" },
  { value: "wrike", label: "Wrike" },
  { value: "basecamp", label: "Basecamp" },
  { value: "airtable", label: "Airtable" },
  { value: "smartsheet", label: "Smartsheet" },

  // İletişim (İş Yönetimi Entegreli)
  { value: "slack", label: "Slack" },
  { value: "msteams", label: "Microsoft Teams" },
  { value: "discord", label: "Discord (Community/Dev)" },

  // Tasarım İş Birliği (Frontend'ciler için önemlidir)
  { value: "figma", label: "Figma" },
  { value: "zeplin", label: "Zeplin" },
  { value: "miro", label: "Miro" },
  { value: "invision", label: "InVision" },
];
