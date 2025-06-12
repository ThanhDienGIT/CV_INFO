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
  Avatar,
  Form,
  Input,
  Button,
  message,
} from 'antd';
import {
  CalendarOutlined,
  HomeOutlined,
  PhoneOutlined,
  GithubOutlined,
  UserOutlined,
  AppstoreOutlined,
  MailOutlined,
  FacebookOutlined,
  TwitterOutlined,
  YoutubeOutlined,
  InstagramOutlined,
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
const { TextArea } = Input;

// ===================================================================
// --- DỮ LIỆU (Bạn có thể thay đổi dữ liệu ở đây) ---
// ===================================================================

const cvData = {
  name: 'Nguyễn Trần Thanh Điền',
  title: 'Developer & Product Manager',
  avatar: 'https://placehold.co/400x400/262626/DAA520?text=TĐ', 
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
    { role: 'DEVELOPER', company: 'VHEC', period: '2023', responsibilities: ['Dev', 'Phát triển và bảo trì các ứng dụng web'] },
    { role: 'DEVELOPER', company: 'VNPT', period: '2023 - Hiện tại', responsibilities: ['Dev', 'Project Manager', 'Support kỹ thuật cho khách hàng.', 'Phát triển và bảo trì các ứng dụng web và di động.'] },
  ],
  education: [{ degree: 'KỸ SƯ KỸ THUẬT PHẦN MỀM', university: 'ĐẠI HỌC CẦN THƠ', period: '2018 - 2022' }],
};

const affiliateProducts = [
    { id: 1, name: '[6.6-VC ĐẾN 20%] Thùng 24 Lon Nước Tăng Lực Sting Vàng', image: 'https://placehold.co/600x600/ffc107/000000?text=Sting+Gold', price: '226.000₫', sold: '2k', tags: ['Mall', '10% Giảm'], link: '#', discountPercentage: '-6%', shopName: 'Suntory Pepsico' },
    { id: 2, name: 'Laptop Gaming Acer Nitro 5 Eagle AN515-57-5669', image: 'https://placehold.co/600x600/333333/FFFFFF?text=Laptop+Gaming', price: '19.990.000₫', sold: '560', tags: ['Mall', 'Trả góp 0%'], link: '#', discountPercentage: '-20%', extraInfo: 'Hàng quốc tế' },
    { id: 3, name: 'Điện Thoại iPhone 14 Pro Max 128GB - Hàng Chính Hãng', image: 'https://placehold.co/600x600/A2A2A2/000000?text=iPhone+14+Pro', price: '27.490.000₫', sold: '1.2k', tags: ['Shop+'], link: '#', shopName: 'Apple Flagship Store' },
    { id: 4, name: 'Khóa học Lập trình Web từ Zero đến Hero', image: 'https://placehold.co/600x600/2a2a72/ffffff?text=Khoá+Học+Code', price: '499.000₫', sold: '8.5k', tags: ['Top bán chạy', 'Học online'], link: '#', discountPercentage: '-50%' },
    { id: 5, name: 'Bàn phím cơ không dây AKKO', image: 'https://placehold.co/600x600/945ec8/ffffff?text=Keyboard', price: '1.750.000₫', sold: '998', tags: [], link: '#', shopName: 'AKKO Official Store' },
];

const goldColor = '#DAA520'; // Màu vàng chủ đạo

// ===================================================================
// --- CÁC COMPONENT TRANG (Pages) ---
// ===================================================================

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '28px' }}><Title level={4} style={{ borderBottom: `2px solid ${goldColor}`, paddingBottom: '8px', marginBottom: '16px', color: goldColor, letterSpacing: '1px' }}>{title.toUpperCase()}</Title>{children}</div>
);

const CVPage = () => (
  <div style={{ background: '#262626', padding: '40px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', maxWidth: '1100px', margin: 'auto' }}>
    <Header style={{ backgroundColor: 'transparent', padding: 0, height: 'auto', textAlign: 'center', marginBottom: '24px' }}><Avatar size={128} src={cvData.avatar} style={{ border: `4px solid ${goldColor}`, marginBottom: '20px' }} /><Title style={{ color: goldColor, marginBottom: 0, letterSpacing: '2px' }}>{cvData.name}</Title><Title level={4} style={{ color: 'rgba(255, 255, 255, 0.65)', marginTop: '8px' }}>{cvData.title}</Title></Header>
    <Row gutter={[16, 16]} justify="center" style={{ textAlign: 'center', marginBottom: '32px' }}><Col xs={24} sm={12} md={6}><Space><CalendarOutlined /> <Text>{cvData.contact.dob}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><PhoneOutlined /> <Text>{cvData.contact.phone}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><MailOutlined /> <Text>{cvData.contact.email}</Text></Space></Col><Col xs={24} sm={12} md={6}><Space><GithubOutlined /> <Text>{cvData.contact.github}</Text></Space></Col></Row>
    <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />
    <Row gutter={48}><Col xs={24} md={8}><Section title="Giới thiệu"><Paragraph>{cvData.introduction}</Paragraph></Section><Section title="Kỹ năng">{cvData.skills.map((skill, index) => <Paragraph key={index}>• {skill}</Paragraph>)}</Section><Section title="Chứng chỉ">{cvData.certificates.map((cert, index) => <div key={index}><Text strong>{cert.name}</Text> <Text type="secondary">({cert.date})</Text></div>)}</Section></Col><Col xs={24} md={16}><Section title="Kinh nghiệm làm việc"><Timeline>{cvData.experience.map((exp, index) => <Timeline.Item key={index} color={goldColor}><Title level={5}>{exp.role}</Title><Text strong>{exp.company}</Text> | <Text type="secondary">{exp.period}</Text><ul style={{ paddingLeft: 20, marginTop: 8 }}>{exp.responsibilities.map((res, i) => <li key={i}><Paragraph style={{ margin: 0 }}>{res}</Paragraph></li>)}</ul></Timeline.Item>)}</Timeline></Section><Section title="Học vấn"><Timeline>{cvData.education.map((edu, index) => <Timeline.Item key={index} color={goldColor}><Title level={5}>{edu.degree}</Title><Text strong>{edu.university}</Text> | <Text type="secondary">{edu.period}</Text></Timeline.Item>)}</Timeline></Section></Col></Row>
  </div>
);

const ProductsPage = () => (
  <div style={{ maxWidth: '1200px', margin: 'auto' }}>
    <Title level={2} style={{ textAlign: 'center', color: goldColor, marginBottom: '40px' }}>Sản Phẩm Gợi Ý</Title>
    <Row gutter={[24, 24]}>{affiliateProducts.map(product => (<Col key={product.id} xs={24} sm={12} md={8} lg={6}><a href={product.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}><Card hoverable cover={<div style={{ position: 'relative' }}><img alt={product.name} src={product.image} style={{ aspectRatio: '1 / 1', objectFit: 'cover', width: '100%' }} />{product.discountPercentage && (<Tag color="red" style={{ position: 'absolute', top: 8, right: 8, fontSize: '14px', padding: '2px 8px' }}>{product.discountPercentage}</Tag>)}</div>} style={{ height: '100%', display: 'flex', flexDirection: 'column' }} bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}><div style={{ flex: '1 0 auto' }}><Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '8px', minHeight: '44px' }}>{product.name}</Paragraph>{product.shopName && (<Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>Bán bởi: {product.shopName}</Text>)}<Space wrap size={[4, 8]} style={{ marginBottom: '8px' }}>{product.tags.map(tag => <Tag key={tag} color="gold">{tag}</Tag>)}{product.extraInfo && <Tag color="blue">{product.extraInfo}</Tag>}</Space></div><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}><Text style={{ color: goldColor, fontSize: '1.2em', fontWeight: 'bold' }}>{product.price}</Text><Text type="secondary">Đã bán {product.sold}</Text></div></Card></a></Col>))}</Row>
  </div>
);

const ContactPage = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    message.success('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    form.resetFields();
  };

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', background: '#262626', padding: '40px', borderRadius: '8px' }}>
      <Title level={2} style={{ textAlign: 'center', color: goldColor, marginBottom: '10px' }}>Liên Hệ Với Tôi</Title>
      <Paragraph style={{ textAlign: 'center', marginBottom: '40px' }}>
        Mọi thắc mắc hoặc cơ hội hợp tác, xin vui lòng điền vào form bên dưới.
      </Paragraph>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="name" label="Họ và Tên" rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!' }]}>
          <Input placeholder="Nguyễn Văn A" />
        </Form.Item>
        <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}>
          <Input placeholder="example@email.com" />
        </Form.Item>
        <Form.Item name="phone" label="Số điện thoại (Tùy chọn)">
          <Input placeholder="09xxxxxxxx" />
        </Form.Item>
        <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: 'Vui lòng nhập nội dung liên hệ!' }]}>
          <TextArea rows={5} placeholder="Nội dung bạn muốn trao đổi..." />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" size="large">Gửi liên hệ</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const Promotion_3D = () => {
  const [linkIframe, setIframe] = React.useState('https://my.spline.design/genkubgreetingrobot-kBqWlcrWbK8ucWtfmwyWmmeb/');

  return (
    <div>
      <iframe src={linkIframe} width="100%" height="600px" style={{border:'none'}} title="3D Animation"></iframe>
    </div>
  );
};

// ===================================================================
// --- CẤU HÌNH ROUTER VÀ BỐ CỤC CHÍNH ---
// ===================================================================

const routesConfig = [
  { path: '/', label: 'Sản phẩm', component: <ProductsPage />, icon: <AppstoreOutlined /> },
  { path: '/profile', label: 'Thông tin cá nhân', component: <CVPage />, icon: <UserOutlined /> },
  { path: '/contact', label: 'Liên hệ', component: <ContactPage />, icon: <MailOutlined /> },
  { path: '/3D', label: 'Hoạt ảnh 3D', component: <Promotion_3D />, icon: <MailOutlined /> },
];



const AppContent = () => {
    const location = useLocation();
    const mobileMenuStyles = ` @media (max-width: 767px) { .ant-layout-header { padding: 0 16px !important; } .ant-menu-horizontal { border-bottom: none !important; } .ant-menu-item { padding: 0 12px !important; } .ant-menu-item-selected { background-color: ${goldColor} !important; border-radius: 8px; } .ant-menu-item-selected a, .ant-menu-item-selected .anticon { color: black !important; } .ant-menu-item-selected a:hover { color: black !important; } } `;

    return (
        <Layout style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <style>{mobileMenuStyles}</style>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
                <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]} style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}>
                    {routesConfig.map(route => (<Menu.Item key={route.path} icon={route.icon}><Link to={route.path}>{route.label}</Link></Menu.Item>))}
                </Menu>
            </Header>

            <Content style={{ padding: '50px 24px', background: '#1d1d1d', flex: '1 0 auto' }}>
                <Routes>
                    {routesConfig.map(route => (<Route key={route.path} path={route.path} element={route.component} />))}
                </Routes>
            </Content>

            <Footer style={{ background: '#141414', color: 'rgba(255, 255, 255, 0.65)', padding: '40px 24px' }}>
              <div style={{ maxWidth: '1200px', margin: 'auto' }}>
                <Row justify="center" align="top" gutter={[48, 48]}>
                  <Col xs={24} md={12} lg={8}>
                    <Paragraph style={{ textAlign: 'center' }}>"Với mong muốn mang đến những sản phẩm chất lượng và những thông tin hữu ích, tôi cam kết mang đến khách hàng những trải nghiệm tuyệt vời nhất."</Paragraph>
                    <Space size="large" style={{ display: 'flex', justifyContent: 'center', fontSize: '24px', marginTop: '20px' }}>
                      <a href="#" target="_blank" rel="noopener noreferrer"><FacebookOutlined /></a>
                      <a href="#" target="_blank" rel="noopener noreferrer"><InstagramOutlined /></a>
                      <a href="#" target="_blank" rel="noopener noreferrer"><YoutubeOutlined /></a>
                      <a href="#" target="_blank" rel="noopener noreferrer"><TwitterOutlined /></a>
                    </Space>
                  </Col>
                </Row>
                <Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                <Row justify="center" align="top" gutter={[32, 32]}>
                  <Col xs={12} sm={8} md={4}>
                    <Title level={5}>VỀ TÔI</Title>
                    <Link to="/profile" style={{ display: 'block', marginBottom: '8px' }}>Thông tin</Link>
                    <Link to="/" style={{ display: 'block', marginBottom: '8px' }}>Sản phẩm</Link>
                  </Col>
                   <Col xs={12} sm={8} md={4}>
                    <Title level={5}>HỖ TRỢ</Title>
                    <Link to="/contact" style={{ display: 'block', marginBottom: '8px' }}>Liên hệ</Link>
                    <a href="#" style={{ display: 'block', marginBottom: '8px' }}>Câu hỏi thường gặp</a>
                  </Col>
                  <Col xs={24} sm={8} md={4}>
                     <Title level={5}>LIÊN HỆ</Title>
                     <Paragraph style={{ margin: 0 }}>{cvData.contact.phone}</Paragraph>
                     <Paragraph style={{ margin: 0 }}>{cvData.contact.email}</Paragraph>
                  </Col>
                </Row>
                 <Divider style={{ borderColor: 'rgba(255,255,255,0.1)' }} />
                 <Text type="secondary" style={{ textAlign: 'center', display: 'block', marginTop: '20px' }}>© Bản quyền thuộc về Thanh Điền</Text>
              </div>
            </Footer>
        </Layout>
    );
}

function App() {
  const { darkAlgorithm } = theme;
  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm, token: { colorPrimary: goldColor, colorBgBase: '#141414' } }}>
        <BrowserRouter><AppContent /></BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
