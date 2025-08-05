import React from 'react';
import { FaCheckCircle, FaComments, FaBook, FaShieldAlt, FaChartLine, FaUsers } from 'react-icons/fa';
import { BiMessageAltDetail } from 'react-icons/bi';
import { hover } from '@testing-library/user-event/dist/hover';

const features = [
  {
    icon: <BiMessageAltDetail size={30} color="#0ABAB5" />,
    title: 'Smart Doubt Resolution',
    description: 'Get instant help from teachers and peers with our intelligent Q&A system',
    bg: '#E6F9F9'
  },
  {
    icon: <FaCheckCircle size={30} color="#0ABAB5" />,
    title: 'Assignment Management',
    description: 'Streamlined assignment creation, submission, and grading workflow',
    bg: '#E0FAF2',
  },
  {
    icon: <FaBook size={30} color="#A073E3" />,
    title: 'Digital Notes Library',
    description: 'Access comprehensive study materials and share resources seamlessly',
    bg: '#F4EFFF'
  },
  {
    icon: <FaUsers size={30} color="#F3964E" />,
    title: 'Collaborative Learning',
    description: 'Connect with classmates and teachers through integrated chat system',
    bg: '#FFF2E8'
  },
  {
    icon: <FaChartLine size={30} color="#E063BF" />,
    title: 'Progress Tracking',
    description: 'Monitor academic performance with detailed analytics and insights',
    bg: '#FFF0F8'
  },
  {
    icon: <FaShieldAlt size={30} color="#8B7EFF" />,
    title: 'Secure Platform',
    description: 'Your data is protected with enterprise-grade security measures',
    bg: '#EDF0FF'
  }
];

const Features = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#FFEDF3' }}>
      <div className="container text-center">
        <h2 className="font-weight-bold mb-3" style={{ color: '#0ABAB5' }}>
          Everything You Need to Excel
        </h2>
        <p className="mb-5 text-muted">
          Powerful tools designed to enhance learning outcomes for both students and educators
        </p>

        <div className="row">
          {features.map((feature, index) => (
            <div className="col-md-4 mb-4 d-flex" key={index}>
              <div
                className="w-100 p-4 rounded shadow-sm text-left  className={`w-100 p-4 rounded shadow-sm text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:bg-opacity-90`}"
                style={{
                  backgroundColor: feature.bg,
                  borderRadius: '15px',
                  minHeight: '160px',
                }}
              >
                <div className="mb-3">{feature.icon}</div>
                <h5 style={{ color: '#333', fontWeight: 'bold' }}>{feature.title}</h5>
                <p style={{ color: '#555' }}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;