// app/contact/page.js
"use client";

import { useState } from "react";
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaClock,
  FaPaperPlane,
  FaWhatsapp,
  FaHeadset,
  FaComments,
  FaCheckCircle
} from "react-icons/fa";
import { 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram
} from "react-icons/fa6";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    category: "general"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email Support",
      details: ["support@coursemaster.com", "info@coursemaster.com"],
      description: "We respond within 24 hours",
      color: "from-blue-500 to-cyan-500",
      link: "mailto:support@coursemaster.com"
    },
    {
      icon: FaPhone,
      title: "Phone Support",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Mon-Fri, 9am-6pm EST",
      color: "from-purple-500 to-pink-500",
      link: "tel:+15551234567"
    },
    {
      icon: FaMapMarkerAlt,
      title: "Our Headquarters",
      details: ["123 Education Street", "San Francisco, CA 94107"],
      description: "Visit us anytime",
      color: "from-green-500 to-teal-500",
      link: "https://maps.google.com"
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp Chat",
      details: ["+1 (555) 123-4567"],
      description: "24/7 quick responses",
      color: "from-green-600 to-emerald-600",
      link: "https://wa.me/15551234567"
    },
  ];

  const supportCategories = [
    { id: "general", label: "General Inquiry", icon: "📋" },
    { id: "technical", label: "Technical Support", icon: "💻" },
    { id: "billing", label: "Billing & Payments", icon: "💰" },
    { id: "course", label: "Course Content", icon: "📚" },
    { id: "corporate", label: "Corporate Training", icon: "🏢" },
    { id: "feedback", label: "Feedback & Suggestions", icon: "💡" },
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page or visit your account settings."
    },
    {
      question: "Can I get a refund for a course?",
      answer: "Yes, we offer a 30-day money-back guarantee. Contact our support team for assistance."
    },
    {
      question: "How do I access purchased courses?",
      answer: "All your courses are available in the 'My Courses' section of your dashboard."
    },
    {
      question: "Do you offer certificates?",
      answer: "Yes, upon course completion, you'll receive a verified digital certificate."
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          category: "general"
        });
      }, 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl opacity-90 mb-8">
              We&apos;re here to help you succeed. Reach out to us for any questions, 
              support, or feedback. Our team is ready to assist you.
            </p>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <FaHeadset className="text-2xl" />
              <span className="text-lg font-semibold">24/7 Support Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.link}
                className="group block"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br ${info.color} text-white mb-6 group-hover:scale-110 transition-transform`}>
                    <info.icon className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{info.title}</h3>
                  <div className="space-y-2 mb-4">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-700 font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">{info.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <FaComments className="text-3xl text-blue-600" />
                <h2 className="text-3xl font-bold">Send us a Message</h2>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12">
                  <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Message Sent Successfully!</h3>
                  <p className="text-gray-600">
                    Thank you for contacting us. Our team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="How can we help you?"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Support Category *</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {supportCategories.map((cat) => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                          className={`px-4 py-3 rounded-lg border-2 transition-all ${
                            formData.category === cat.id
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                          }`}
                        >
                          <div className="text-lg mb-1">{cat.icon}</div>
                          <div className="text-sm font-medium">{cat.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <FaClock className="text-2xl text-blue-600" />
                  <h3 className="text-2xl font-bold">Office Hours</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { day: "Monday - Friday", time: "9:00 AM - 6:00 PM EST" },
                    { day: "Saturday", time: "10:00 AM - 4:00 PM EST" },
                    { day: "Sunday", time: "Support via Email Only" },
                    { day: "Emergency Support", time: "24/7 via WhatsApp" },
                  ].map((schedule, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b last:border-0">
                      <span className="font-medium">{schedule.day}</span>
                      <span className="text-gray-600">{schedule.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
                <p className="text-gray-600 mb-6">
                  Follow us on social media for updates, tips, and community discussions.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: FaTwitter, label: "Twitter", color: "bg-blue-400 hover:bg-blue-500", url: "https://twitter.com/coursemaster" },
                    { icon: FaFacebook, label: "Facebook", color: "bg-blue-600 hover:bg-blue-700", url: "https://facebook.com/coursemaster" },
                    { icon: FaInstagram, label: "Instagram", color: "bg-pink-500 hover:bg-pink-600", url: "https://instagram.com/coursemaster" },
                    { icon: FaLinkedin, label: "LinkedIn", color: "bg-blue-700 hover:bg-blue-800", url: "https://linkedin.com/company/coursemaster" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-4 rounded-xl flex flex-col items-center justify-center gap-2 transition-all hover:shadow-lg transform hover:-translate-y-1`}
                    >
                      <social.icon className="text-2xl" />
                      <span className="font-semibold">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <details key={index} className="group">
                      <summary className="flex justify-between items-center cursor-pointer p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <span className="font-semibold">{faq.question}</span>
                        <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <div className="p-4 text-gray-600">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a href="/faq" className="text-blue-600 hover:text-blue-800 font-semibold">
                    View All FAQs →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Visit Our Office</h2>
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-[16/6] bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
              <div className="text-center">
                <FaMapMarkerAlt className="text-6xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">CourseMaster Headquarters</h3>
                <p className="text-gray-700 text-lg">123 Education Street, San Francisco, CA 94107</p>
                <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for the latest course updates, learning tips, 
              and exclusive offers.
            </p>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}