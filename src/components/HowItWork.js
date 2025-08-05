import React from 'react';

const steps = [
  {
    number: '1',
    color: '#007bff', // Bootstrap blue
    title: 'Sign Up & Choose Role',
    description: "Select whether you're a student or teacher to get a personalized experience"
  },
  {
    number: '2',
    color: '#a020f0', // Purple
    title: 'Explore Features',
    description: 'Access assignments, notes, chat with peers, and get help with doubts'
  },
  {
    number: '3',
    color: '#28a745', // Bootstrap green
    title: 'Achieve Excellence',
    description: 'Track progress, collaborate effectively, and reach your academic goals'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container text-center">
        <div className="mb-3">
          <span
            className="badge badge-light border px-3 py-1"
            style={{ fontSize: '0.9rem', color: '#0ABAB5' }}
          >
            🔁 How It Works
          </span>
        </div>
        <h2 className="font-weight-bold mb-2">Simple Steps to Success</h2>
        <p className="text-muted mb-5">
          Get started in minutes and transform your learning experience
        </p>

        <div className="row">
          {steps.map((step, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="mb-3">
                <div
                  className="d-inline-flex align-items-center justify-content-center"
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: step.color,
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    marginBottom: '15px'
                  }}
                >
                  {step.number}
                </div>
              </div>
              <h5 className="font-weight-bold">{step.title}</h5>
              <p className="text-muted">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
