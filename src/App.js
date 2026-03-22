import React, { useMemo, useState } from "react";
import {
  App as AntdApp,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Drawer,
  FloatButton,
  Form,
  Grid,
  Input,
  Layout,
  Menu,
  Progress,
  Row,
  Space,
  Tag,
  Timeline,
  Typography,
} from "antd";
import {
  ApiOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  ClusterOutlined,
  CodeOutlined,
  DatabaseOutlined,
  DeploymentUnitOutlined,
  EnvironmentOutlined,
  HomeOutlined,
  IdcardOutlined,
  MailOutlined,
  MedicineBoxOutlined,
  MenuOutlined,
  PhoneOutlined,
  ProjectOutlined,
  SafetyCertificateOutlined,
  SendOutlined,
  SolutionOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import logo from "./image/IMG_6948.JPG";

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { TextArea } = Input;

const hospitalTheme = {
  primary: "#0C5A6B",
  primaryDeep: "#093C47",
  accent: "#18A1A5",
  accentSoft: "#E6F7F7",
  successSoft: "#E8F7F0",
  background: "#F4F8FA",
  surface: "#FFFFFF",
  surfaceAlt: "#F8FCFD",
  border: "#D8E5E9",
  text: "#14333C",
  textSoft: "#5B7680",
  shadow: "0 20px 60px rgba(7, 44, 54, 0.08)",
};

const portfolioData = {
  name: "Nguyễn Trần Thanh Điền",
  title: "Chuyên viên Xử Lý Dữ Liệu & Phát Triển Ứng Dụng",
  shortTitle: "Full Stack Developer",
  location: "Ninh Kiều, Cần Thơ",
  dob: "13/06/2000",
  phone: "+84 973 481 549",
  email: "theshy.snow0612@gmail.com",
  intro:
    "Tôi có 2 năm kinh nghiệm lập trình, trong đó có kinh nghiệm làm việc với C#, WinForms và phát triển ứng dụng Web bằng React, Next.js. Tôi có kiến thức về xử lý dữ liệu, cơ sở dữ liệu, mô hình client-server, JSON/XML và RESTful API. Ngoài ra, tôi từng tham gia hỗ trợ triển khai các hệ thống trong lĩnh vực y tế, bao gồm bệnh án điện tử.",
  objective:
    "Mong muốn được làm việc lâu dài trong môi trường bệnh viện, nơi tôi có thể vận dụng kiến thức về C#, WinForms, DevExpress hoặc Website (bất kể công nghệ gì), cơ sở dữ liệu và kinh nghiệm hỗ trợ hệ thống để góp phần nâng cao hiệu quả vận hành và hỗ trợ công việc chuyên môn. Đồng thời, tôi muốn tiếp tục phát triển bản thân và gắn bó cùng sự phát triển của bệnh viện.",
  education: {
    degree: "Software Technology (Kỹ sư phần mềm)",
    school: "Đại học Cần Thơ (CTU)",
    period: "2018 - 2023",
    rank: "Tốt nghiệp loại Giỏi",
    thesis: "Phát triển website sàn thương mại điện tử lĩnh vực y tế",
    projects: [
      "Tìm cây khung nhỏ nhất với giải thuật Prim",
      "Quản lý sinh viên với WinForms",
      "Ứng dụng Java Swing",
    ],
  },
};

const highlightStats = [
  {
    value: "2+",
    label: "Năm kinh nghiệm",
    description: "Lập trình và triển khai phần mềm",
  },
  {
    value: "8+",
    label: "Hệ thống / đợt triển khai",
    description: "Hành chính công và y tế",
  },
  {
    value: "C#",
    label: "Năng lực kỹ thuật nổi bật",
    description: "WinForms, Web, API, dữ liệu",
  },
  {
    value: "EMR",
    label: "Kinh nghiệm y tế",
    description: "Hỗ trợ triển khai bệnh án điện tử",
  },
];

const fitCards = [
  {
    icon: <CodeOutlined />,
    title: "Phát triển ứng dụng nội bộ",
    description:
      "Có thể tham gia phát triển và nâng cấp phần mềm phục vụ nghiệp vụ bệnh viện bằng C#, WinForms hoặc nền tảng Web hiện đại.",
  },
  {
    icon: <DatabaseOutlined />,
    title: "Xử lý dữ liệu & cơ sở dữ liệu",
    description:
      "Có nền tảng về SQL, thiết kế cơ sở dữ liệu, tối ưu truy vấn và làm việc với Oracle, PostgreSQL, MySQL, SQL Server, Firebase.",
  },
  {
    icon: <DeploymentUnitOutlined />,
    title: "Triển khai & hỗ trợ hệ thống",
    description:
      "Từng tham gia triển khai hệ thống nghiệp vụ và hỗ trợ vận hành thực tế, phù hợp với môi trường cần tính ổn định và phối hợp nhiều bộ phận.",
  },
];

const experienceTimeline = [
  {
    company: "VHEC",
    role: "Lập trình viên",
    period: "2023 - 2024",
    bullets: [
      "Lập trình hệ thống quản lý công việc nội bộ HRM bằng ASP.NET Core và ReactJS.",
      "Lập trình demo hệ thống sử dụng kiến trúc CQRS cho bài toán quản lý sản phẩm.",
      "Phát triển và triển khai hệ thống quản lý cho Hội Liên hiệp Phụ nữ tỉnh Hậu Giang.",
    ],
    tags: ["ASP.NET Core", "ReactJS", "CQRS", "Triển khai"],
  },
  {
    company: "VNPT",
    role: "Lập trình viên & Chuyên viên triển khai phần mềm",
    period: "2024 - Hiện tại",
    bullets: [
      "Phát triển và triển khai phần mềm quản lý văn bản cho sở ban ngành (Eoffice).",
      "Hỗ trợ triển khai bệnh án điện tử tại các trung tâm y tế Hậu Giang.",
      "Phát triển và triển khai phần mềm Quản lý Hợp đồng Trạm thu phát sóng vô tuyến (BTS).",
      "Phát triển và triển khai phần mềm Quản lý Công việc (nội bộ).",
      "Phát triển và triển khai phần mềm Khảo sát Chất lượng Dịch vụ (nội bộ).",
      "Triển khai hệ thống quản lý Tỉnh Đoàn cho tỉnh Hậu Giang.",
    ],
    tags: ["Triển khai phần mềm", "Hỗ trợ hệ thống", "Y tế", "Nghiệp vụ"],
  },
];

const projectCards = [
  {
    title: "Hỗ trợ triển khai bệnh án điện tử",
    company: "VNPT",
    period: "2024 - Hiện tại",
    summary:
      "Hỗ trợ triển khai hệ thống bệnh án điện tử tại các trung tâm y tế ở Hậu Giang, tiếp cận môi trường y tế và quy trình phần mềm chuyên môn.",
    highlights: ["EMR", "Y tế", "Triển khai thực tế", "Hỗ trợ hệ thống"],
  },
  {
    title: "Hỗ trợ và lập trình Hệ thống EOFFICE quản lý văn bản Sở ban nghành",
    company: "VNPT",
    period: "2024 - Hiện tại",
    summary:
      "Xây dựng hệ thống hỗ trợ quản lý văn bản cho cán bộ, tập trung vào luồng xử lý nghiệp vụ, theo dõi tiến độ và phối hợp giữa các bộ phận.",
    highlights: [
      "Javascript",
      "Java",
      "Oracle",
      "Truy vấn CSDL tối ưu số lượng lớn",
    ],
  },
  {
    title: "Quản lý hợp đồng trạm BTS",
    company: "VNPT",
    period: "2024 - Hiện tại",
    summary:
      "Phát triển và triển khai phần mềm quản lý hợp đồng trạm thu phát sóng vô tuyến, tối ưu hóa việc theo dõi hồ sơ và tiến độ xử lý.",
    highlights: ["Triển khai", "Quản lý hồ sơ", "Theo dõi dữ liệu"],
  },
  {
    title: "Phần mềm quản lý công việc nội bộ",
    company: "VNPT",
    period: "2024 - Hiện tại",
    summary:
      "Tham gia phát triển và triển khai phần mềm nội bộ hỗ trợ điều phối, giao việc và kiểm soát tiến độ thực hiện trong tổ chức.",
    highlights: ["Workflow", "Nội bộ", "Triển khai", "Hỗ trợ người dùng"],
  },
  {
    title: "Phần mềm khảo sát chất lượng dịch vụ",
    company: "VNPT",
    period: "2024 - Hiện tại",
    summary:
      "Triển khai giải pháp khảo sát chất lượng dịch vụ nhằm thu thập dữ liệu phản hồi, hỗ trợ đánh giá trải nghiệm và cải tiến quy trình.",
    highlights: ["Khảo sát", "Báo cáo dữ liệu", "Chất lượng dịch vụ"],
  },
  {
    title: "Hệ thống quản lý Hội Liên hiệp Phụ nữ Hậu Giang",
    company: "VHEC",
    period: "2023 - 2024",
    summary:
      "Phát triển và triển khai hệ thống quản lý phục vụ nghiệp vụ hành chính, hỗ trợ lưu trữ dữ liệu và xử lý công việc hiệu quả hơn.",
    highlights: ["Triển khai thực tế", "Quản lý dữ liệu", "Hành chính công"],
  },
  {
    title: "Demo quản lý sản phẩm theo CQRS",
    company: "VHEC",
    period: "2023 - 2024",
    summary:
      "Thực hiện demo hệ thống áp dụng kiến trúc CQRS để tách riêng luồng đọc/ghi, thuận lợi cho mở rộng và tối ưu xử lý dữ liệu.",
    highlights: ["CQRS", "Thiết kế hệ thống", "API", "Tư duy kiến trúc"],
  },
  {
    title: "Hệ thống quản lý Tỉnh Đoàn Hậu Giang",
    company: "VNPT",
    period: "2024 - Hiện tại",
    summary:
      "Tham gia triển khai hệ thống quản lý cho đơn vị nhà nước, bảo đảm phù hợp nghiệp vụ, dữ liệu và nhu cầu vận hành thực tế.",
    highlights: [
      "Triển khai hệ thống",
      "Làm việc với nghiệp vụ",
      "Hỗ trợ vận hành",
    ],
  },
  {
    title: "Hệ thống HRM quản lý công việc nội bộ",
    company: "VHEC",
    period: "2023 - 2024",
    summary:
      "Xây dựng hệ thống hỗ trợ quản lý công việc nội bộ, tập trung vào luồng xử lý nghiệp vụ, theo dõi tiến độ và phối hợp giữa các bộ phận.",
    highlights: [
      "ASP.NET Core",
      "ReactJS",
      "Quản lý công việc",
      "Nghiệp vụ nội bộ",
    ],
  },
];

const skillGroups = [
  {
    title: "Ngôn ngữ lập trình",
    icon: <CodeOutlined />,
    items: ["C#", "JavaScript", "Java", "PHP"],
  },
  {
    title: "Framework / thư viện",
    icon: <ClusterOutlined />,
    items: [
      "WinForms",
      "React",
      "Next.js",
      "AngularJS",
      "Laravel",
      "Java Spring",
    ],
  },
  {
    title: "Cơ sở dữ liệu",
    icon: <DatabaseOutlined />,
    items: [
      "SQL",
      "Thiết kế CSDL",
      "Tối ưu truy vấn",
      "Oracle",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "Firebase",
    ],
  },
  {
    title: "Tích hợp hệ thống",
    icon: <ApiOutlined />,
    items: ["RESTful API", "JSON", "XML"],
  },
  {
    title: "Hệ thống & hỗ trợ vận hành",
    icon: <ToolOutlined />,
    items: [
      "Client - Server",
      "Hỗ trợ hệ thống",
      "Triển khai phần mềm",
      "Phân tích yêu cầu",
    ],
  },
  {
    title: "Công cụ",
    icon: <SafetyCertificateOutlined />,
    items: ["Git", "Quản lý phiên bản"],
  },
];

const capabilityBars = [
  { label: "C# / .NET / PHP / JS / (HTML/CSS) / JAVA", value: 95 },
  {
    label: "React / Next.js / Angular / Laravel / Java Spring / NestJS",
    value: 90,
  },
  {
    label:
      "Cơ sở dữ liệu / SQL (Oracle, PostgreSQL, MySQL, Firebase, SQL Server)",
    value: 90,
  },
  { label: "REST API / JSON / XML", value: 95 },
  { label: "Triển khai & hỗ trợ hệ thống", value: 95 },
  { label: "Phân tích nghiệp vụ / phối hợp", value: 90 },
  { label: "Backend/Web: ASP.NET Core MVC, Razor Pages, C#", value: 85 },
];

const radarData = [
  { subject: "Framework (React, Laravel, Angular)", value: 85 },
  { subject: "Web Frontend", value: 90 },
  { subject: "Database", value: 90 },
  { subject: "Backend", value: 95 },
  { subject: "System Support", value: 82 },
  { subject: "API", value: 82 },
];

const globalStyles = `
  body {
    background: ${hospitalTheme.background};
    color: ${hospitalTheme.text};
  }

  .hospital-app {
    background:
      radial-gradient(circle at top right, rgba(24, 161, 165, 0.10), transparent 24%),
      radial-gradient(circle at left top, rgba(12, 90, 107, 0.12), transparent 28%),
      linear-gradient(180deg, #f9fcfd 0%, ${hospitalTheme.background} 100%);
  }

  .page-shell {
    max-width: 1240px;
    margin: 0 auto;
    padding: 28px 12px 0;
  }

  .page-section {
    margin-bottom: 28px;
  }

  .page-hero {
    position: relative;
    overflow: hidden;
    padding: 28px;
    border-radius: 28px;
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 252, 253, 0.96) 100%),
      ${hospitalTheme.surface};
    border: 1px solid rgba(216, 229, 233, 0.92);
    box-shadow: ${hospitalTheme.shadow};
  }

  .page-hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(12, 90, 107, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(12, 90, 107, 0.05) 1px, transparent 1px);
    background-size: 34px 34px;
    pointer-events: none;
    opacity: 0.45;
  }

  .page-hero > * {
    position: relative;
    z-index: 1;
  }

  .soft-card {
    height: 100%;
    border-radius: 24px;
    border: 1px solid ${hospitalTheme.border};
    box-shadow: 0 14px 32px rgba(11, 52, 62, 0.06);
    background: ${hospitalTheme.surface};
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  }

  .soft-card:hover {
    transform: translateY(-4px);
    border-color: rgba(12, 90, 107, 0.32);
    box-shadow: 0 18px 40px rgba(11, 52, 62, 0.10);
  }

  .soft-card .ant-card-body {
    padding: 24px;
  }

  .hero-chip {
    border-radius: 999px;
    padding: 8px 14px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.04em;
    border: 1px solid rgba(12, 90, 107, 0.12);
    background: rgba(255, 255, 255, 0.80);
    color: ${hospitalTheme.primary};
    backdrop-filter: blur(10px);
  }

  .section-kicker {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    color: ${hospitalTheme.primary};
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 12px;
  }

  .section-title {
    margin: 0 0 8px !important;
    color: ${hospitalTheme.primaryDeep} !important;
  }

  .section-description {
    margin-bottom: 0 !important;
    color: ${hospitalTheme.textSoft};
    max-width: 820px;
    line-height: 1.7;
  }

  .brand-link {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    text-decoration: none;
    color: inherit;
    min-width: 0;
  }

  .brand-mark {
    width: 54px;
    height: 54px;
    border-radius: 14px;
    overflow: hidden;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${hospitalTheme.primary} 0%, ${hospitalTheme.accent} 100%);
    box-shadow: 0 12px 24px rgba(12, 90, 107, 0.18);
  }

  .brand-logo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .brand-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    line-height: 1.15;
  }

  .brand-title {
    font-size: 16px;
    font-weight: 800;
    color: ${hospitalTheme.primaryDeep};
    line-height: 1.1;
  }

  .brand-subtitle {
    font-size: 12px;
    color: ${hospitalTheme.textSoft};
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: 4px;
  }

  .header-shell {
    position: sticky;
    top: 0;
    z-index: 1000;
    padding: 0 20px;
    background: rgba(244, 248, 250, 0.82);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(216, 229, 233, 0.84);
  }

  .header-inner {
    max-width: 1240px;
    margin: 0 auto;
    height: 78px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .desktop-menu.ant-menu {
    border-bottom: none;
    background: transparent;
    min-width: 0;
    flex: 1;
    justify-content: flex-end;
  }

  .desktop-menu.ant-menu .ant-menu-item,
  .drawer-menu.ant-menu .ant-menu-item {
    border-radius: 12px;
    margin-inline: 4px;
    color: ${hospitalTheme.text};
    font-weight: 600;
  }

  .stat-tile {
    padding: 20px;
    border-radius: 22px;
    border: 1px solid ${hospitalTheme.border};
    background: linear-gradient(180deg, #ffffff 0%, ${hospitalTheme.surfaceAlt} 100%);
    box-shadow: 0 10px 24px rgba(7, 44, 54, 0.05);
    height: 100%;
  }

  .stat-value {
    font-size: 32px;
    font-weight: 800;
    color: ${hospitalTheme.primaryDeep};
    line-height: 1;
    margin-bottom: 10px;
  }

  .profile-panel {
    position: relative;
    overflow: hidden;
  }

  .profile-panel::after {
    content: '';
    position: absolute;
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(24, 161, 165, 0.14) 0%, rgba(24, 161, 165, 0) 70%);
    top: -30px;
    right: -20px;
    pointer-events: none;
  }

  .monogram {
    width: 92px;
    height: 92px;
    border-radius: 24px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, ${hospitalTheme.primaryDeep} 0%, ${hospitalTheme.primary} 55%, ${hospitalTheme.accent} 100%);
    box-shadow: 0 16px 30px rgba(12, 90, 107, 0.18);
    margin-bottom: 18px;
  }

  .profile-avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .profile-info-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 14px;
  }

  .profile-info-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${hospitalTheme.accentSoft};
    color: ${hospitalTheme.primary};
    flex-shrink: 0;
  }

  .fit-card-icon,
  .skill-card-icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${hospitalTheme.accentSoft};
    color: ${hospitalTheme.primary};
    font-size: 20px;
    margin-bottom: 16px;
  }

  .emphasis-card {
    background: linear-gradient(135deg, rgba(12, 90, 107, 0.97), rgba(24, 161, 165, 0.95));
    color: #ffffff;
    border: none;
  }

  .emphasis-card .ant-card-body,
  .emphasis-card .ant-typography,
  .emphasis-card .ant-typography-secondary {
    color: #ffffff !important;
  }

  .mini-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.68);
    border: 1px solid rgba(12, 90, 107, 0.08);
    font-weight: 600;
    color: ${hospitalTheme.text};
  }

  .compact-list {
    padding-left: 18px;
    margin: 12px 0 0;
  }

  .compact-list li {
    margin-bottom: 8px;
    color: ${hospitalTheme.textSoft};
    line-height: 1.7;
  }

  .timeline-company {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
    margin-bottom: 8px;
  }

  .footer-shell {
    margin-top: 28px;
    background: rgba(255, 255, 255, 0.72);
    border-top: 1px solid rgba(216, 229, 233, 0.92);
  }

  .footer-inner {
    max-width: 1240px;
    margin: 0 auto;
    padding: 28px 20px 34px;
  }

  .footer-link {
    color: ${hospitalTheme.textSoft};
    text-decoration: none;
  }

  .footer-link:hover {
    color: ${hospitalTheme.primary};
  }

  .contact-link {
    color: inherit;
    text-decoration: none;
  }

  .equal-card .ant-card-body {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  @media (max-width: 991px) {
    .page-hero {
      padding: 22px;
      border-radius: 24px;
    }
  }

  @media (max-width: 767px) {
    .header-shell {
      padding: 0 14px;
    }

    .header-inner {
      height: 72px;
    }

    .brand-mark {
      width: 46px;
      height: 46px;
      border-radius: 12px;
    }

    .brand-title {
      font-size: 15px;
    }

    .brand-subtitle {
      font-size: 11px;
    }

    .page-shell {
      padding-top: 20px;
      padding-left: 4px;
      padding-right: 4px;
    }

    .soft-card .ant-card-body {
      padding: 20px;
    }

    .stat-value {
      font-size: 28px;
    }

    .monogram {
      width: 84px;
      height: 84px;
      border-radius: 20px;
    }
  }
`;

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: "easeOut" },
};

const SectionHeader = ({ eyebrow, title, description }) => (
  <div style={{ marginBottom: 22 }}>
    <div className="section-kicker">
      <MedicineBoxOutlined />
      <span>{eyebrow}</span>
    </div>
    <Title level={2} className="section-title">
      {title}
    </Title>
    {description ? (
      <Paragraph className="section-description">{description}</Paragraph>
    ) : null}
  </div>
);

const PageContainer = ({ children }) => (
  <div className="page-shell">{children}</div>
);

const ProfileInfoRow = ({ icon, label, value, href, invert = false }) => {
  const labelColor = invert ? "rgba(255,255,255,0.78)" : hospitalTheme.textSoft;
  const valueColor = invert ? "#ffffff" : hospitalTheme.text;
  const iconStyle = invert
    ? { background: "rgba(255,255,255,0.14)", color: "#ffffff" }
    : undefined;

  return (
    <div className="profile-info-row">
      <span className="profile-info-icon" style={iconStyle}>
        {icon}
      </span>
      <div>
        <Text style={{ color: labelColor, display: "block" }}>{label}</Text>
        {href ? (
          <a href={href} className="contact-link">
            <Text strong style={{ color: valueColor }}>
              {value}
            </Text>
          </a>
        ) : (
          <Text strong style={{ color: valueColor }}>
            {value}
          </Text>
        )}
      </div>
    </div>
  );
};

const StatTile = ({ value, label, description }) => (
  <div className="stat-tile">
    <div className="stat-value">{value}</div>
    <Text
      strong
      style={{ color: hospitalTheme.text, display: "block", marginBottom: 8 }}
    >
      {label}
    </Text>
    <Text style={{ color: hospitalTheme.textSoft }}>{description}</Text>
  </div>
);

const FitCard = ({ icon, title, description }) => (
  <Card className="soft-card equal-card">
    <div className="fit-card-icon">{icon}</div>
    <Title
      level={4}
      style={{ color: hospitalTheme.primaryDeep, marginBottom: 10 }}
    >
      {title}
    </Title>
    <Paragraph
      style={{
        color: hospitalTheme.textSoft,
        marginBottom: 0,
        lineHeight: 1.7,
      }}
    >
      {description}
    </Paragraph>
  </Card>
);

const ProjectCard = ({ project }) => (
  <Card className="soft-card equal-card">
    <Space direction="vertical" size={14} style={{ width: "100%" }}>
      <div>
        <Space wrap size={[8, 8]} style={{ marginBottom: 10 }}>
          <Tag color="cyan">{project.company}</Tag>
          <Tag color="blue">{project.period}</Tag>
        </Space>
        <Title
          level={4}
          style={{ margin: 0, color: hospitalTheme.primaryDeep }}
        >
          {project.title}
        </Title>
      </div>

      <Paragraph
        style={{
          color: hospitalTheme.textSoft,
          marginBottom: 0,
          lineHeight: 1.7,
        }}
      >
        {project.summary}
      </Paragraph>

      <div>
        <Text strong style={{ color: hospitalTheme.text }}>
          Trọng tâm:
        </Text>
        <div style={{ marginTop: 10 }}>
          <Space wrap size={[8, 8]}>
            {project.highlights.map((item) => (
              <Tag
                key={item}
                style={{
                  padding: "6px 10px",
                  borderRadius: 999,
                  marginInlineEnd: 0,
                }}
              >
                {item}
              </Tag>
            ))}
          </Space>
        </div>
      </div>
    </Space>
  </Card>
);

const SkillGroupCard = ({ icon, title, items }) => (
  <Card className="soft-card equal-card">
    <div className="skill-card-icon">{icon}</div>
    <Title
      level={4}
      style={{ color: hospitalTheme.primaryDeep, marginBottom: 14 }}
    >
      {title}
    </Title>
    <Space wrap size={[8, 10]}>
      {items.map((item) => (
        <Tag
          key={item}
          style={{ padding: "6px 12px", borderRadius: 999, marginInlineEnd: 0 }}
        >
          {item}
        </Tag>
      ))}
    </Space>
  </Card>
);

const HomePage = () => (
  <PageContainer>
    <div className="page-section page-hero">
      <Row gutter={[36, 36]} align="middle">
        <Col xs={24} lg={14}>
          <Space wrap size={[10, 10]} style={{ marginBottom: 18 }}>
            <span className="hero-chip">Hospital IT</span>
            <span className="hero-chip">C# / WinForms</span>
            <span className="hero-chip">React / Next.js</span>
            <span className="hero-chip">Database & System Support</span>
          </Space>

          <Title
            style={{
              marginBottom: 8,
              color: hospitalTheme.primaryDeep,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              lineHeight: 1.05,
            }}
          >
            {portfolioData.name}
          </Title>

          <Title
            level={3}
            style={{
              color: hospitalTheme.primary,
              marginTop: 0,
              marginBottom: 18,
            }}
          >
            {portfolioData.title}
          </Title>

          <Paragraph
            style={{
              fontSize: 16,
              color: hospitalTheme.textSoft,
              maxWidth: 760,
              lineHeight: 1.7,
            }}
          >
            {portfolioData.intro}
          </Paragraph>

          <Space wrap size="middle" style={{ marginTop: 8 }}>
            <Link to="/profile">
              <Button type="primary" size="large" icon={<ArrowRightOutlined />}>
                Xem hồ sơ năng lực
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="large">Liên hệ</Button>
            </Link>
          </Space>

          <Row gutter={[16, 16]} style={{ marginTop: 28 }}>
            {highlightStats.map((item) => (
              <Col xs={12} lg={12} xl={6} key={item.label}>
                <StatTile {...item} />
              </Col>
            ))}
          </Row>
        </Col>

        <Col xs={24} lg={10}>
          <Card className="soft-card profile-panel">
            <div className="monogram">
              <img src={logo} alt="Thanh Điền" className="profile-avatar" />
            </div>
            <Title
              level={3}
              style={{ marginBottom: 6, color: hospitalTheme.primaryDeep }}
            >
              {portfolioData.shortTitle}
            </Title>
            <Paragraph
              style={{
                color: hospitalTheme.textSoft,
                marginBottom: 18,
                lineHeight: 1.7,
              }}
            >
              Định hướng phù hợp với môi trường bệnh viện: phát triển phần mềm
              nội bộ, xử lý dữ liệu, tích hợp API và hỗ trợ hệ thống vận hành ổn
              định.
            </Paragraph>

            <ProfileInfoRow
              icon={<PhoneOutlined />}
              label="Điện thoại"
              value={portfolioData.phone}
              href={`tel:${portfolioData.phone.replace(/\s+/g, "")}`}
            />
            <ProfileInfoRow
              icon={<MailOutlined />}
              label="Email"
              value={portfolioData.email}
              href={`mailto:${portfolioData.email}`}
            />
            <ProfileInfoRow
              icon={<EnvironmentOutlined />}
              label="Khu vực"
              value={portfolioData.location}
            />
            <ProfileInfoRow
              icon={<CalendarOutlined />}
              label="Ngày sinh"
              value={portfolioData.dob}
            />

            <Divider style={{ margin: "18px 0" }} />

            <Space wrap size={[10, 10]}>
              <span className="mini-pill">
                <CheckCircleOutlined /> Lập trình phần mềm
              </span>
              <span className="mini-pill">
                <CheckCircleOutlined /> Triển khai phần mềm
              </span>
              <span className="mini-pill">
                <CheckCircleOutlined /> Hỗ trợ hệ thống
              </span>
              <span className="mini-pill">
                <CheckCircleOutlined /> Y tế & dữ liệu
              </span>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>

    <div className="page-section">
      <SectionHeader
        eyebrow="Giá trị phù hợp môi trường bệnh viện"
        title="Những năng lực có thể đóng góp ngay"
        description="Thay vì làm portfolio theo kiểu sáng tạo quá đà, giao diện này đi theo tinh thần y tế - doanh nghiệp: rõ ràng, đáng tin cậy, dễ đọc và thể hiện tốt tính hệ thống."
      />

      <Row gutter={[20, 20]}>
        {fitCards.map((card) => (
          <Col xs={24} md={8} key={card.title}>
            <FitCard {...card} />
          </Col>
        ))}
      </Row>
    </div>

    <div className="page-section">
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <Card className="soft-card">
            <SectionHeader
              eyebrow="Mục tiêu nghề nghiệp"
              title="Định hướng gắn bó và phát triển lâu dài"
              description={portfolioData.objective}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="soft-card emphasis-card">
            <Title level={4}>Tư duy phù hợp Hospital IT</Title>
            <Paragraph style={{ lineHeight: 1.7 }}>
              Tập trung vào tính ổn định, hỗ trợ người dùng thực tế, hiểu quy
              trình nghiệp vụ và ưu tiên giá trị vận hành hơn là hiệu ứng trình
              diễn.
            </Paragraph>
            <Space direction="vertical" size={10}>
              <Text>• Ưu tiên hiệu quả vận hành</Text>
              <Text>• Có nền tảng dữ liệu & hệ thống</Text>
              <Text>• Từng tiếp cận triển khai EMR</Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  </PageContainer>
);

const ProfilePage = () => (
  <PageContainer>
    <div className="page-section">
      <SectionHeader
        eyebrow="Profile Overview"
        title="Hồ sơ năng lực"
        description="Tóm tắt thông tin và năng lực"
      />
    </div>

    <Row gutter={[20, 20]} align="top">
      <Col xs={24} lg={8}>
        <Card className="soft-card">
          <Title level={4} style={{ color: hospitalTheme.primaryDeep }}>
            Thông tin cá nhân
          </Title>
          <Divider />
          <ProfileInfoRow
            icon={<PhoneOutlined />}
            label="Điện thoại"
            value={portfolioData.phone}
            href={`tel:${portfolioData.phone.replace(/\s+/g, "")}`}
          />
          <ProfileInfoRow
            icon={<MailOutlined />}
            label="Email"
            value={portfolioData.email}
            href={`mailto:${portfolioData.email}`}
          />
          <ProfileInfoRow
            icon={<EnvironmentOutlined />}
            label="Địa chỉ"
            value={portfolioData.location}
          />
          <ProfileInfoRow
            icon={<CalendarOutlined />}
            label="Ngày sinh"
            value={portfolioData.dob}
          />
        </Card>

        <Card className="soft-card" style={{ marginTop: 20 }}>
          <Title level={4} style={{ color: hospitalTheme.primaryDeep }}>
            Tóm tắt chuyên môn
          </Title>
          <Paragraph
            style={{
              color: hospitalTheme.textSoft,
              marginBottom: 0,
              lineHeight: 1.8,
            }}
          >
            Có kinh nghiệm phát triển ứng dụng bằng C#, WinForms, Web React /
            Next.js, làm việc với cơ sở dữ liệu và tham gia triển khai hệ thống
            thực tế. Phù hợp các vị trí liên quan đến phát triển phần mềm nội
            bộ, xử lý dữ liệu hoặc hỗ trợ hệ thống trong bệnh viện.
          </Paragraph>
        </Card>
      </Col>

      <Col xs={24} lg={16}>
        <Card className="soft-card">
          <Title
            level={3}
            style={{ color: hospitalTheme.primaryDeep, marginBottom: 14 }}
          >
            Giới thiệu
          </Title>
          <Paragraph
            style={{
              color: hospitalTheme.textSoft,
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            {portfolioData.intro}
          </Paragraph>

          <Divider />

          <Title level={4} style={{ color: hospitalTheme.primaryDeep }}>
            Điểm mạnh nổi bật
          </Title>

          <Row gutter={[12, 12]}>
            {[
              "Tư duy hệ thống và dữ liệu",
              "Có thể làm Desktop lẫn Web",
              "Tiếp cận môi trường y tế thực tế",
              "Hỗ trợ triển khai và vận hành",
              "Có khả năng làm việc với nghiệp vụ",
              "Sẵn sàng gắn bó lâu dài",
            ].map((item) => (
              <Col xs={24} sm={12} key={item}>
                <div className="mini-pill" style={{ width: "100%" }}>
                  <CheckCircleOutlined
                    style={{ color: hospitalTheme.primary }}
                  />
                  <span>{item}</span>
                </div>
              </Col>
            ))}
          </Row>
        </Card>

        <Card className="soft-card" style={{ marginTop: 20 }}>
          <Title
            level={3}
            style={{ color: hospitalTheme.primaryDeep, marginBottom: 18 }}
          >
            Học vấn
          </Title>

          <Timeline
            items={[
              {
                color: hospitalTheme.primary,
                children: (
                  <div>
                    <div className="timeline-company">
                      <Title level={5} style={{ margin: 0 }}>
                        {portfolioData.education.degree}
                      </Title>
                      <Tag color="blue">{portfolioData.education.period}</Tag>
                    </div>

                    <Text strong style={{ display: "block", marginBottom: 8 }}>
                      {portfolioData.education.school}
                    </Text>

                    <Paragraph
                      style={{
                        marginBottom: 8,
                        color: hospitalTheme.textSoft,
                        lineHeight: 1.7,
                      }}
                    >
                      {portfolioData.education.rank}
                    </Paragraph>

                    <Paragraph style={{ marginBottom: 8, lineHeight: 1.7 }}>
                      <Text strong>Luận văn:</Text>{" "}
                      {portfolioData.education.thesis}
                    </Paragraph>

                    <Paragraph style={{ marginBottom: 8 }}>
                      <Text strong>Đồ án / bài tập lớn:</Text>
                    </Paragraph>

                    <ul className="compact-list">
                      {portfolioData.education.projects.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  </PageContainer>
);

const ExperiencePage = () => (
  <PageContainer>
    <div className="page-section">
      <SectionHeader
        eyebrow="Career Journey"
        title="Kinh nghiệm làm việc & dự án triển khai"
        description="Trang tóm tắt kinh nghiệm và các dự án đã triển khai thực hiện"
      />
    </div>

    <Card className="soft-card page-section">
      <Title
        level={3}
        style={{ color: hospitalTheme.primaryDeep, marginBottom: 18 }}
      >
        Kinh nghiệm làm việc
      </Title>
      <Timeline
        items={experienceTimeline.map((exp) => ({
          color: hospitalTheme.primary,
          children: (
            <div>
              <div className="timeline-company">
                <Title level={5} style={{ margin: 0 }}>
                  {exp.role}
                </Title>
                <Tag color="cyan">{exp.company}</Tag>
                <Tag color="blue">{exp.period}</Tag>
              </div>
              <Space wrap size={[8, 8]} style={{ marginBottom: 10 }}>
                {exp.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Space>
              <ul className="compact-list">
                {exp.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ),
        }))}
      />
    </Card>

    <div className="page-section">
      <Title
        level={3}
        style={{ color: hospitalTheme.primaryDeep, marginBottom: 18 }}
      >
        Dự án / hạng mục tiêu biểu
      </Title>
      <Row gutter={[20, 20]}>
        {projectCards.map((project) => (
          <Col xs={24} md={12} key={project.title}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </div>
  </PageContainer>
);

const SkillsPage = () => (
  <PageContainer>
    <div className="page-section">
      <SectionHeader
        eyebrow="Skills Matrix"
        title="Năng lực kỹ thuật"
        description="Trang kỹ năng được thiết kế lại theo phong cách enterprise: vừa có biểu đồ tổng quan để tạo ấn tượng, vừa có nhóm kỹ năng rõ ràng để nhà tuyển dụng dễ quét thông tin."
      />
    </div>

    <Row gutter={[20, 20]} className="page-section">
      <Col xs={24} lg={11}>
        <Card className="soft-card" style={{ height: "100%" }}>
          <Title level={4} style={{ color: hospitalTheme.primaryDeep }}>
            Bản đồ năng lực
          </Title>
          <Paragraph style={{ color: hospitalTheme.textSoft, lineHeight: 1.7 }}>
            Mức độ dưới đây là thang tự đánh giá để thể hiện điểm mạnh tương đối
            giữa các nhóm năng lực.
          </Paragraph>
          <div style={{ width: "100%", height: 360 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: hospitalTheme.text }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 100]}
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  name="Năng lực"
                  dataKey="value"
                  stroke={hospitalTheme.primary}
                  fill={hospitalTheme.primary}
                  fillOpacity={0.45}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </Col>

      <Col xs={24} lg={13}>
        <Card className="soft-card" style={{ height: "100%" }}>
          <Title level={4} style={{ color: hospitalTheme.primaryDeep }}>
            Mức độ trọng tâm
          </Title>
          <Space direction="vertical" size={18} style={{ width: "100%" }}>
            {capabilityBars.map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                    gap: 12,
                  }}
                >
                  <Text strong style={{ color: hospitalTheme.text }}>
                    {item.label}
                  </Text>
                  <Text style={{ color: hospitalTheme.textSoft }}>
                    {item.value}%
                  </Text>
                </div>
                <Progress
                  percent={item.value}
                  showInfo={false}
                  strokeColor={hospitalTheme.primary}
                  trailColor="#EAF1F4"
                />
              </div>
            ))}
          </Space>
        </Card>
      </Col>
    </Row>

    <Row gutter={[20, 20]}>
      {skillGroups.map((group) => (
        <Col xs={24} md={12} xl={8} key={group.title}>
          <SkillGroupCard {...group} />
        </Col>
      ))}
    </Row>
  </PageContainer>
);

const ContactPage = () => {
  const [form] = Form.useForm();
  const { message } = AntdApp.useApp();

  const handleSubmit = (values) => {
    console.log("Contact values:", values);
    message.success(
      "Đã ghi nhận thông tin liên hệ. Bạn chỉ cần nối form này với API gửi mail là có thể dùng thật.",
    );
    form.resetFields();
  };

  return (
    <PageContainer>
      <div className="page-section">
        <SectionHeader
          eyebrow="Contact"
          title="Liên hệ"
          description="Trang liên hệ được làm theo hướng tuyển dụng: rõ ràng, có điểm nhấn, có form, nhưng vẫn giữ cảm giác tin cậy và chuyên nghiệp thay vì quá phô diễn hiệu ứng."
        />
      </div>

      <Row gutter={[20, 20]} align="top">
        <Col xs={24} lg={9}>
          <Card className="soft-card emphasis-card">
            <Title level={3}>Sẵn sàng cho môi trường bệnh viện</Title>
            <Paragraph style={{ lineHeight: 1.75 }}>
              Tôi mong muốn tham gia công việc dài hạn trong môi trường bệnh
              viện, nơi có thể vừa phát triển phần mềm, vừa hỗ trợ hệ thống phục
              vụ hiệu quả cho chuyên môn và vận hành.
            </Paragraph>

            <Divider style={{ borderColor: "rgba(255,255,255,0.18)" }} />

            <ProfileInfoRow
              invert
              icon={<PhoneOutlined />}
              label="Điện thoại"
              value={portfolioData.phone}
              href={`tel:${portfolioData.phone.replace(/\s+/g, "")}`}
            />
            <ProfileInfoRow
              invert
              icon={<MailOutlined />}
              label="Email"
              value={portfolioData.email}
              href={`mailto:${portfolioData.email}`}
            />
            <ProfileInfoRow
              invert
              icon={<EnvironmentOutlined />}
              label="Khu vực"
              value={portfolioData.location}
            />
          </Card>

          <Card className="soft-card" style={{ marginTop: 20 }}>
            <Title level={4} style={{ color: hospitalTheme.primaryDeep }}>
              Điểm nhấn phù hợp
            </Title>
            <ul className="compact-list" style={{ marginTop: 8 }}>
              <li>Phù hợp phát triển ứng dụng nội bộ và xử lý dữ liệu.</li>
              <li>Có kinh nghiệm triển khai phần mềm và hỗ trợ người dùng.</li>
              <li>Đã có tiếp cận với bệnh án điện tử và môi trường y tế.</li>
            </ul>
          </Card>
        </Col>

        <Col xs={24} lg={15}>
          <Card className="soft-card">
            <Title level={3} style={{ color: hospitalTheme.primaryDeep }}>
              Gửi thông tin liên hệ
            </Title>
            <Paragraph
              style={{ color: hospitalTheme.textSoft, lineHeight: 1.7 }}
            >
              Form này hiện đang ở mức giao diện. Khi tích hợp thực tế, bạn có
              thể nối với EmailJS, Formspree hoặc API backend riêng để nhận
              thông tin ứng tuyển.
            </Paragraph>

            <Form form={form} layout="vertical" onFinish={handleSubmit}>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label="Họ và tên"
                    rules={[
                      { required: true, message: "Vui lòng nhập họ và tên" },
                    ]}
                  >
                    <Input placeholder="Nhập họ và tên" size="large" />
                  </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      { type: "email", message: "Email không hợp lệ" },
                    ]}
                  >
                    <Input placeholder="Nhập email" size="large" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="phone" label="Số điện thoại">
                <Input placeholder="Nhập số điện thoại" size="large" />
              </Form.Item>

              <Form.Item
                name="message"
                label="Nội dung"
                rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
              >
                <TextArea rows={6} placeholder="Nhập nội dung liên hệ" />
              </Form.Item>

              <Space wrap>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  icon={<SendOutlined />}
                >
                  Gửi liên hệ
                </Button>
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="contact-link"
                >
                  <Button size="large">Gửi email trực tiếp</Button>
                </a>
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

const routes = [
  {
    path: "/",
    label: "Trang chủ",
    icon: <HomeOutlined />,
    element: <HomePage />,
  },
  {
    path: "/profile",
    label: "Hồ sơ",
    icon: <IdcardOutlined />,
    element: <ProfilePage />,
  },
  {
    path: "/experience",
    label: "Kinh nghiệm",
    icon: <ProjectOutlined />,
    element: <ExperiencePage />,
  },
  {
    path: "/skills",
    label: "Kỹ năng",
    icon: <SolutionOutlined />,
    element: <SkillsPage />,
  },
  {
    path: "/contact",
    label: "Liên hệ",
    icon: <MailOutlined />,
    element: <ContactPage />,
  },
];

const AppShell = () => {
  const location = useLocation();
  const screens = Grid.useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const menuItems = useMemo(
    () =>
      routes.map((route) => ({
        key: route.path,
        icon: route.icon,
        label: (
          <Link to={route.path} onClick={() => setDrawerOpen(false)}>
            {route.label}
          </Link>
        ),
      })),
    [],
  );

  return (
    <Layout
      className="hospital-app"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <style>{globalStyles}</style>

      <Header className="header-shell">
        <div className="header-inner">
          <Link to="/" className="brand-link">
            <div className="brand-mark">
              <img src={logo} alt="Thanh Điền" className="brand-logo" />
            </div>
            <div className="brand-text">
              <span className="brand-title">Thanh Điền</span>
              <span className="brand-subtitle">FULL STACK DEVELOPER</span>
            </div>
          </Link>

          {screens.md ? (
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              className="desktop-menu"
            />
          ) : (
            <Button
              icon={<MenuOutlined />}
              shape="circle"
              size="large"
              onClick={() => setDrawerOpen(true)}
            />
          )}
        </div>
      </Header>

      <Drawer
        title="Điều hướng"
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        rootClassName="mobile-nav-drawer"
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          className="drawer-menu"
        />
      </Drawer>

      <Content
        style={{
          padding: "0 20px 24px",
          flex: "1 0 auto",
        }}
      >
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <motion.div {...pageTransition}>{route.element}</motion.div>
                }
              />
            ))}
          </Routes>
        </AnimatePresence>
      </Content>

      <Footer
        className="footer-shell"
        style={{
          marginTop: "auto",
        }}
      >
        <div className="footer-inner">
          <Row gutter={[20, 20]} align="middle" justify="space-between">
            <Col xs={24} lg={12}>
              <Title
                level={4}
                style={{ color: hospitalTheme.primaryDeep, marginBottom: 8 }}
              >
                Tóm tắt nhanh
              </Title>
              <Paragraph
                style={{
                  color: hospitalTheme.textSoft,
                  marginBottom: 0,
                  lineHeight: 1.7,
                }}
              >
                Backend: C#, ASP.NET Core, Node.js (NestJS), Laravel (PHP), Java
                Spring (Java) <br />
                Frontend: React, Next.js, HTML, CSS, JavaScript <br />
                Database: SQL Server, MongoDB (nếu có) <br />
                Khác: REST API, CRUD systems, data validation, error handling,
                Razor, MVC pattern, Git, Docker
              </Paragraph>
            </Col>
            <Col xs={24} lg={12}>
              <Space
                direction="vertical"
                size={8}
                style={{
                  width: "100%",
                  alignItems: screens.lg ? "flex-end" : "flex-start",
                }}
              >
                <a
                  href={`tel:${portfolioData.phone.replace(/\s+/g, "")}`}
                  className="footer-link"
                >
                  {portfolioData.phone}
                </a>
                <a
                  href={`mailto:${portfolioData.email}`}
                  className="footer-link"
                >
                  {portfolioData.email}
                </a>
                <Text style={{ color: hospitalTheme.textSoft }}>
                  {portfolioData.location}
                </Text>
              </Space>
            </Col>
          </Row>
        </div>
      </Footer>

      <FloatButton
        icon={<MailOutlined />}
        tooltip="Email"
        onClick={() => window.open(`mailto:${portfolioData.email}`, "_self")}
        style={{ right: 24, bottom: 94 }}
      />
      <FloatButton.BackTop style={{ right: 24, bottom: 24 }} />
    </Layout>
  );
};

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: hospitalTheme.primary,
          colorLink: hospitalTheme.primary,
          colorBgBase: hospitalTheme.background,
          colorTextBase: hospitalTheme.text,
          colorBorderSecondary: hospitalTheme.border,
          borderRadius: 16,
          borderRadiusLG: 24,
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        },
        components: {
          Button: {
            controlHeightLG: 48,
            borderRadiusLG: 16,
          },
          Card: {
            borderRadiusLG: 24,
          },
          Menu: {
            itemSelectedColor: "#ffffff",
            itemSelectedBg: hospitalTheme.primary,
            itemHoverColor: hospitalTheme.primary,
            itemBorderRadius: 12,
            horizontalItemSelectedColor: hospitalTheme.primary,
            horizontalItemHoverColor: hospitalTheme.primary,
          },
          Input: {
            controlHeightLG: 48,
            borderRadiusLG: 14,
          },
        },
      }}
    >
      <AntdApp>
        <BrowserRouter>
          <AppShell />
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
