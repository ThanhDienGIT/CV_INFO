import React from 'react';
// Ant Design components and styles
import {
  Layout,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  Timeline,
  ConfigProvider,
  theme,
  Card,
  Tag,
  Menu,
  Avatar, // Import Avatar component
} from 'antd';
import {
  CalendarOutlined,
  HomeOutlined,
  PhoneOutlined,
  GithubOutlined,
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
} from '@ant-design/icons';
// React Router
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;

// ===================================================================
// --- DỮ LIỆU (Bạn có thể thay đổi dữ liệu ở đây) ---
// ===================================================================

const cvData = {
  name: 'Nguyễn Trần Thanh Điền',
  title: 'Developer & Product Manager',
  avatar: 'https://www.shutterstock.com/image-vector/web-developer-design-vector-illustration-600nw-314602454.jpg', // Placeholder avatar
  contact: {
    dob: '13/06/2000',
    address: '',
    phone: '+84 966 631 453',
    email: 'thanhdiensett@gmail.com',
    github: 'ThanhDienGIT',
  },
  introduction:
    'Với nhiều năm kinh nghiệm trong lĩnh vực công nghệ thông tin, tôi đã làm việc trong nhiều vai trò khác nhau từ lập trình viên đến quản lý sản phẩm. Tôi đam mê công nghệ và luôn tìm kiếm cơ hội để học hỏi và phát triển bản thân. Tôi có khả năng làm việc nhóm tốt và luôn sẵn sàng hỗ trợ đồng nghiệp.',
  skills: [
    'Ngôn ngữ lập trình: JavaScript, TypeScript, PHP',
    'Frameworks: ReactJS, NodeJS, Laravel, NestJS, NextJS',
    'Cơ sở dữ liệu: MySQL, MongoDB, PostgreSQL, oracle',
    'Quản lý source code: Git, GitHub, GitLab',
    'Kỹ năng phân tích và giải quyết vấn đề',
    'Kỹ năng giao tiếp và làm việc nhóm',
    'Kỹ năng quản lý thời gian và dự án',
  ],
  certificates: [
    { name: 'AWS Cloud Technical & Practitioner Essentials', date: '29/12/2023' },
    { name: 'Quản trị mạng Cisco cơ bản - CCNA', date: '29/12/2023' },
  ],
  experience: [
    {
      role: 'DEVELOPER',
      company: 'VHEC',
      period: '2023',
      responsibilities: [
        'Dev',
        'Phát triển và bảo trì các ứng dụng web',
      ],
    },
    {
      role: 'DEVELOPER',
      company: 'VNPT',
      period: '2023 - Hiện tại',
      responsibilities: [
        'Dev',
        'Project Manager',
        'Support kỹ thuật cho khách hàng.',
        'Phát triển và bảo trì các ứng dụng web và di động.',
      ],
    },
  ],
  education: [
    {
      degree: 'KỸ SƯ KỸ THUẬT PHẦN MỀM',
      university: 'ĐẠI HỌC CẦN THƠ',
      period: '2018 - 2022',
    },
  ],
};


const affiliateProducts = [
    { id: 1, name: '[6.6-VC ĐẾN 20%] Thùng 24 Lon Nước Tăng Lực Sting Vàng', image: 'https://placehold.co/400x400/ffc107/000000?text=Sting+Gold', price: '226.000₫', sold: '2k', tags: ['Mall', '10% Giảm', 'HOA HỒNG XTRA'], link: '#' },
    { id: 2, name: 'Laptop Gaming Acer Nitro 5 Eagle AN515-57-5669', image: 'https://placehold.co/400x400/333333/FFFFFF?text=Laptop+Gaming', price: '19.990.000₫', sold: '560', tags: ['Mall', 'Trả góp 0%'], link: '#' },
    { id: 3, name: 'Điện Thoại iPhone 14 Pro Max 128GB - Hàng Chính Hãng', image: 'https://placehold.co/400x400/A2A2A2/000000?text=iPhone+14+Pro', price: '27.490.000₫', sold: '1.2k', tags: ['Shop+', 'Giá tốt'], link: '#' },
    { id: 4, name: 'Khóa học Lập trình Web từ Zero đến Hero', image: 'https://placehold.co/400x400/2a2a72/ffffff?text=Khoá+Học+Code', price: '499.000₫', sold: '8.5k', tags: ['Top bán chạy', 'Học online'], link: '#' },
];


// ===================================================================
// --- CÁC COMPONENT TRANG (Pages) ---
// ===================================================================

const goldColor = '#DAA520'; // Màu vàng chủ đạo

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}>
    <Title level={4} style={{ borderBottom: `2px solid ${goldColor}`, paddingBottom: '8px', marginBottom: '16px', color: goldColor, letterSpacing: '1px' }}>
      {title.toUpperCase()}
    </Title>
    {children}
  </div>
);

// --- Trang Thông tin cá nhân (CV) ---
const CVPage = () => (
  <div style={{ background: '#262626', padding: '40px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', maxWidth: '1100px', margin: 'auto' }}>
      <Header style={{ backgroundColor: 'transparent', padding: 0, height: 'auto', textAlign: 'center', marginBottom: '24px' }}>
        <Avatar size={128} src={cvData.avatar} style={{ border: `4px solid ${goldColor}`, marginBottom: '20px' }} />
        <Title style={{ color: goldColor, marginBottom: 0, letterSpacing: '2px' }}>{cvData.name}</Title>
        <Title level={4} style={{ color: 'rgba(255, 255, 255, 0.65)', marginTop: '8px' }}>{cvData.title}</Title>
      </Header>
      <Row gutter={[16, 16]} justify="center" style={{ textAlign: 'center', marginBottom: '32px' }}>
        <Col xs={24} sm={12} md={6}><Space><CalendarOutlined /> <Text>{cvData.contact.dob}</Text></Space></Col>
        <Col xs={24} sm={12} md={6}><Space><PhoneOutlined /> <Text>{cvData.contact.phone}</Text></Space></Col>
        <Col xs={24} sm={12} md={6}><Space><MailOutlined /> <Text>{cvData.contact.email}</Text></Space></Col>
        <Col xs={24} sm={12} md={6}><Space><GithubOutlined /> <Text>{cvData.contact.github}</Text></Space></Col>
      </Row>
      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
      <Row gutter={48}>
        <Col xs={24} md={8}>
          <Section title="Giới thiệu"><Paragraph>{cvData.introduction}</Paragraph></Section>
          <Section title="Kỹ năng">{cvData.skills.map((skill, index) => <Paragraph key={index}>• {skill}</Paragraph>)}</Section>
          <Section title="Chứng chỉ">{cvData.certificates.map((cert, index) => <div key={index}><Text strong>{cert.name}</Text> <Text type="secondary">({cert.date})</Text></div>)}</Section>
        </Col>
        <Col xs={24} md={16}>
          <Section title="Kinh nghiệm làm việc"><Timeline>{cvData.experience.map((exp, index) => <Timeline.Item key={index} color={goldColor}><Title level={5}>{exp.role}</Title><Text strong>{exp.company}</Text> | <Text type="secondary">{exp.period}</Text><ul style={{ paddingLeft: 20, marginTop: 8 }}>{exp.responsibilities.map((res, i) => <li key={i}><Paragraph style={{ margin: 0 }}>{res}</Paragraph></li>)}</ul></Timeline.Item>)}</Timeline></Section>
          <Section title="Học vấn"><Timeline>{cvData.education.map((edu, index) => <Timeline.Item key={index} color={goldColor}><Title level={5}>{edu.degree}</Title><Text strong>{edu.university}</Text> | <Text type="secondary">{edu.period}</Text></Timeline.Item>)}</Timeline></Section>
        </Col>
      </Row>
  </div>
);

// --- Trang Sản phẩm ---
const ProductsPage = () => (
  <div style={{ maxWidth: '1200px', margin: 'auto' }}>
    <Title level={2} style={{ textAlign: 'center', color: goldColor, marginBottom: '40px' }}>Sản Phẩm Gợi Ý</Title>
    <Row gutter={[24, 24]}>
      {affiliateProducts.map(product => (
        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
          <a href={product.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Card hoverable cover={<img alt={product.name} src={product.image} style={{ aspectRatio: '1 / 1', objectFit: 'cover' }} />} style={{ height: '100%', display: 'flex', flexDirection: 'column' }} bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div><Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '8px' }}>{product.name}</Paragraph><Space wrap size={[0, 8]} style={{ marginBottom: '8px' }}>{product.tags.map(tag => <Tag key={tag} color="gold">{tag}</Tag>)}</Space></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}><Text style={{ color: goldColor, fontSize: '1.2em', fontWeight: 'bold' }}>{product.price}</Text><Text type="secondary">Đã bán {product.sold}</Text></div>
            </Card>
          </a>
        </Col>
      ))}
    </Row>
  </div>
);

// --- Trang Liên hệ (Ví dụ để mở rộng) ---
const ContactPage = () => (
    <div style={{textAlign: 'center', maxWidth: '1100px', margin: 'auto'}}>
        <Title level={2} style={{color: goldColor}}>Liên Hệ</Title>
        <Paragraph>Bạn có thể thêm form liên hệ hoặc thông tin khác ở đây.</Paragraph>
    </div>
);


// ===================================================================
// --- CẤU HÌNH ROUTER VÀ BỐ CỤC CHÍNH ---
// ===================================================================

const routesConfig = [
  {
    path: '/',
    label: 'Thông tin cá nhân',
    component: <CVPage />,
    icon: <UserOutlined />,
  },
  {
    path: '/products',
    label: 'Sản phẩm',
    component: <ProductsPage />,
    icon: <AppstoreOutlined />,
  },
  {
    path: '/contact',
    label: 'Liên hệ',
    component: <ContactPage />,
    icon: <MailOutlined />,
  },
  // Thêm các trang khác vào đây
];


const AppContent = () => {
    const location = useLocation();

    return (
        <Layout style={{ minHeight: '100vh' }}> {/* Thay đổi ở đây */}
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}
                >
                    {routesConfig.map(route => (
                        <Menu.Item key={route.path} icon={route.icon}>
                            <Link to={route.path}>{route.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
            </Header>

            <Content style={{ padding: '50px', background: '#1d1d1d' }}>
                <Routes>
                    {routesConfig.map(route => (
                        <Route key={route.path} path={route.path} element={route.component} />
                    ))}
                </Routes>
            </Content>

            <Footer style={{ textAlign: 'center', background: '#141414', color: 'rgba(255, 255, 255, 0.45)', borderTop: '1px solid #303030' }}>
                Create by Thanh Điền ©2024
            </Footer>
        </Layout>
    );
}

function App() {
  const { darkAlgorithm } = theme;

  return (
    <ConfigProvider theme={{
      algorithm: darkAlgorithm,
      token: { colorPrimary: goldColor, colorBgBase: '#141414' },
    }}>
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
