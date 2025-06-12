import React from 'react';
import './styles/faq.css';

const faqs = [
  {
    question: 'How long does auto transport take?',
    answer: 'Transit time depends on distance, but typically takes 3–10 days within the continental U.S.'
  },
  {
    question: 'Is my vehicle insured during transport?',
    answer: 'Yes, all carriers are required to have valid cargo insurance for every shipment.'
  },
  {
    question: 'Can I pack personal items in my car?',
    answer: 'Most carriers allow up to 100 lbs. of personal belongings in the trunk. Check with us first to confirm.'
  },
  {
    question: 'What types of vehicles can you transport?',
    answer: 'We ship cars, SUVs, vans, pickup trucks, and even motorcycles or inoperable vehicles.'
  },
  {
    question: 'Do I have to be present at pickup and delivery?',
    answer: 'Yes, either you or a designated person must be present to sign the inspection forms.'
  }
];

export default function Faqs() {
  return (
    <div className="faqs-container">
      <h2 className="faqs-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div className="faq-item" key={index}>
            <h3 className="faq-question">{faq.question}</h3>
            <p className="faq-answer">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 