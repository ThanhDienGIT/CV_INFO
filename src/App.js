import React from 'react';
// Ant Design components and styles
// import 'antd/dist/reset.css'; // This line caused a compilation error and has been removed.
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
} from 'antd';
import {
  CalendarOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  GithubOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;

// --- Dữ liệu CV ---
const cvData = {
  name: 'Đinh Xuân Thảo',
  title: 'Product Manager',
  contact: {
    dob: '06/11/1991',
    address: '9 Nguyễn Đình Chiểu, P.6, Q.3, TP.HCM',
    phone: '09067999xx',
    email: 'thao@example.com',
    github: 'thao_gh_example',
  },
  introduction:
    'Với hơn hai năm kinh nghiệm ở các vị trí Product Manager, Business Analyst, trong việc hỗ trợ nhóm Agile, tạo, sắp xếp mức độ ưu tiên và quản lý backlog, các chứng chỉ TOEIC 750, Google Adwords và bằng Thạc sỹ Quản trị kinh doanh, tôi mong muốn tận dụng các kỹ năng và kiến thức của mình để đóng góp cho công ty với vai trò là Product Manager.',
  skills: [
    'Tiếng Anh',
    'Phân tích nhu cầu người dùng',
    'Sử dụng Pivotal Tracker',
    'Vẽ Wireframe',
  ],
  certificates: [
    { name: 'GOOGLE ADWORDS', date: '11/2016' },
    { name: 'TOEIC', date: '12/2012' },
  ],
  experience: [
    {
      role: 'PRODUCT MANAGER',
      company: 'VIỆT CV',
      period: '03/2017 - 03/2018',
      responsibilities: [
        'Cung cấp thông tin, định hướng và hỗ trợ nhóm Agile.',
        'Làm việc với người dùng/khách hàng để thu thập thông tin.',
        'Chịu trách nhiệm tạo và sắp xếp thứ tự ưu tiên của backlog.',
      ],
    },
    {
      role: 'BUSINESS ANALYST',
      company: 'VIỆT CV',
      period: '02/2016 - 03/2017',
      responsibilities: [
        'Phân tích và làm việc cùng nhóm Agile để phát triển sản phẩm.',
        'Làm việc trực tiếp với người dùng cuối để tìm hiểu và phân tích.',
        'Phối hợp với developer và tester để cải thiện UI/UX.',
      ],
    },
  ],
  education: [
    {
      degree: 'THẠC SỸ QUẢN TRỊ KINH DOANH',
      university: 'ĐẠI HỌC KINH TẾ',
      period: '10/2013 - 01/2016',
    },
  ],
};

// --- Dữ liệu sản phẩm tiếp thị liên kết ---
const affiliateProducts = [
  {
    id: 1,
    name: '[6.6-VC ĐẾN 20%] Thùng 24 Lon Nước Tăng Lực Sting Vàng',
    image: 'https://placehold.co/400x400/ffc107/000000?text=Sting+Gold',
    price: '226.000₫',
    sold: '2k',
    discount: '-6%',
    tags: ['Mall', '10% Giảm', 'HOA HỒNG XTRA'],
    link: 'https://shopee.vn/Th%C3%B9ng-24-lon-n%C6%B0%E1%BB%9Bc-gi%E1%BA%A3i-kh%C3%A1t-c%C3%B3-gas-Sting-V%C3%A0ng-320ml-lon-i.123456.789012', // Thay link thật vào đây
  },
  {
    id: 2,
    name: 'Laptop Gaming Acer Nitro 5 Eagle AN515-57-5669',
    image: 'https://placehold.co/400x400/333333/FFFFFF?text=Laptop+Gaming',
    price: '19.990.000₫',
    sold: '560',
    discount: '-20%',
    tags: ['Mall', 'Trả góp 0%', 'Freeship'],
    link: 'https://tiki.vn/laptop-gaming-acer-nitro-5-eagle-an515-57-5669-p12345678.html', // Thay link thật vào đây
  },
  {
    id: 3,
    name: 'Điện Thoại iPhone 14 Pro Max 128GB - Hàng Chính Hãng',
    image: 'https://placehold.co/400x400/A2A2A2/000000?text=iPhone+14+Pro',
    price: '27.490.000₫',
    sold: '1.2k',
    discount: '-11%',
    tags: ['Shop+', 'Giá tốt'],
    link: 'https://www.lazada.vn/products/iphone-14-pro-max-128gb-i123456789-s987654321.html', // Thay link thật vào đây
  },
  {
    id: 4,
    name: 'Khóa học Lập trình Web từ Zero đến Hero',
    image: 'https://placehold.co/400x400/2a2a72/ffffff?text=Khoá+Học+Code',
    price: '499.000₫',
    sold: '8.5k',
    discount: '-50%',
    tags: ['Top bán chạy', 'Học online'],
    link: 'https://unica.vn/lap-trinh-web-tu-zero-den-hero', // Thay link thật vào đây
  },
];


// --- Component ---

const Section = ({ title, children, titleColor }) => (
  <div style={{ marginBottom: '28px' }}>
    <Title level={4} style={{ borderBottom: `2px solid ${titleColor}`, paddingBottom: '8px', marginBottom: '16px', color: titleColor, letterSpacing: '1px' }}>
      {title.toUpperCase()}
    </Title>
    {children}
  </div>
);

function App() {
  const { darkAlgorithm } = theme;
  const goldColor = '#DAA520'; // Một màu vàng sang trọng

  return (
    <ConfigProvider theme={{
      algorithm: darkAlgorithm,
      token: {
        colorPrimary: goldColor,
        colorTextBase: 'rgba(255, 255, 255, 0.85)',
        colorBgBase: '#141414',
      },
    }}>
      <Layout>
        {/* ---- Phần CV ---- */}
        <Content style={{ padding: '50px', background: '#1d1d1d' }}>
            <div style={{ background: '#262626', padding: '40px', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)', maxWidth: '1100px', margin: 'auto' }}>
            <Header style={{ backgroundColor: 'transparent', padding: 0, height: 'auto', textAlign: 'center', marginBottom: '24px' }}>
              <Title style={{ color: goldColor, marginBottom: 0, letterSpacing: '2px' }}>{cvData.name}</Title>
              <Title level={4} style={{ color: 'rgba(255, 255, 255, 0.65)', marginTop: '8px' }}>{cvData.title}</Title>
            </Header>

            <Row gutter={[16, 16]} justify="center" style={{ textAlign: 'center', marginBottom: '32px', color: 'rgba(255, 255, 255, 0.65)' }}>
                <Col xs={24} sm={12} md={6}><Space><CalendarOutlined /> <Text>{cvData.contact.dob}</Text></Space></Col>
                <Col xs={24} sm={12} md={10}><Space><HomeOutlined /> <Text>{cvData.contact.address}</Text></Space></Col>
                <Col xs={24} sm={12} md={4}><Space><PhoneOutlined /> <Text>{cvData.contact.phone}</Text></Space></Col>
                <Col xs={24} sm={12} md={4}><Space><GithubOutlined /> <Text>{cvData.contact.github}</Text></Space></Col>
            </Row>

            <Divider style={{ borderColor: 'rgba(255,255,255,0.2)' }} />

            <Row gutter={48}>
              <Col xs={24} md={8}>
                <Section title="Giới thiệu" titleColor={goldColor}><Paragraph>{cvData.introduction}</Paragraph></Section>
                <Section title="Kỹ năng" titleColor={goldColor}>{cvData.skills.map((skill, index) => <Paragraph key={index}>• {skill}</Paragraph>)}</Section>
                <Section title="Chứng chỉ" titleColor={goldColor}>
                  {cvData.certificates.map((cert, index) => (
                    <div key={index}><Text strong>{cert.name}</Text> <Text type="secondary">({cert.date})</Text></div>
                  ))}
                </Section>
              </Col>
              <Col xs={24} md={16}>
                <Section title="Kinh nghiệm làm việc" titleColor={goldColor}>
                  <Timeline>
                    {cvData.experience.map((exp, index) => (
                      <Timeline.Item key={index} color={goldColor}>
                        <Title level={5} style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{exp.role}</Title>
                        <Text strong>{exp.company}</Text> | <Text type="secondary">{exp.period}</Text>
                        <ul style={{ paddingLeft: 20, marginTop: 8 }}>
                          {exp.responsibilities.map((res, i) => <li key={i}><Paragraph style={{ margin: 0 }}>{res}</Paragraph></li>)}
                        </ul>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Section>
                <Section title="Học vấn" titleColor={goldColor}>
                  <Timeline>
                    {cvData.education.map((edu, index) => (
                      <Timeline.Item key={index} color={goldColor}>
                        <Title level={5}>{edu.degree}</Title>
                        <Text strong>{edu.university}</Text> | <Text type="secondary">{edu.period}</Text>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                </Section>
              </Col>
            </Row>
          </div>
        </Content>

        {/* ---- Phần Sản Phẩm Tiếp Thị Liên Kết ---- */}
        <Content style={{ padding: '50px', background: '#141414' }}>
          <div style={{ maxWidth: '1100px', margin: 'auto' }}>
            <Title level={2} style={{ textAlign: 'center', color: goldColor, marginBottom: '40px' }}>Sản Phẩm Gợi Ý</Title>
            <Row gutter={[24, 24]}>
              {affiliateProducts.map(product => (
                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                  <a href={product.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <Card
                      hoverable
                      cover={<img alt={product.name} src={product.image} style={{ aspectRatio: '1 / 1', objectFit: 'cover' }} />}
                      style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                      bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                      <div>
                        <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: '8px' }}>{product.name}</Paragraph>
                        <Space wrap size={[0, 8]} style={{ marginBottom: '8px' }}>
                            {product.tags.map(tag => <Tag key={tag} color="gold">{tag}</Tag>)}
                        </Space>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <Text style={{ color: goldColor, fontSize: '1.2em', fontWeight: 'bold' }}>{product.price}</Text>
                        <Text type="secondary">Đã bán {product.sold}</Text>
                      </div>
                    </Card>
                  </a>
                </Col>
              ))}
            </Row>
          </div>
        </Content>

        {/* ---- Footer ---- */}
        <Footer style={{ textAlign: 'center', background: '#1d1d1d', color: 'rgba(255, 255, 255, 0.45)', borderTop: '1px solid #303030' }}>
          Create by Thanh Điền ©2024
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
