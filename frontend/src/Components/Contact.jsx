import Navbar from './Navbar'
import Footer from './Footer'

function Contact() {
  return (
    <div>
     <Navbar/>
     <div className="bg-gray-100 min-h-screen p-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-lg text-gray-600">We love to hear from you! Reach out to us anytime.</p>
      </div>

      {/* Contact Information Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-12 space-y-6 md:space-y-0 md:space-x-12">
        {/* Address */}
        {/* <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4"> */}
          {/* <div className="text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c.341 0 .677-.034 1-.1m-1 9.1a9.97 9.97 0 01-5.658-1.97m4.658-7.03a3 3 0 11-3-3 3 3 0 013 3zm0 0v.01m0-3.01h.01M12 12h.01M12 12v.01M21 12c0 4.418-3.582 8-8 8m-4.338-3.97A7.972 7.972 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8z"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Our Office</h3>
            <p className="text-gray-600">1234 Business St, Suite 100<br />City, State, ZIP</p>
          </div>
        </div> */}

        {/* Phone */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10v1a10 10 0 0010 10h1m6.72-5.197l-2.9-2.9a1.205 1.205 0 00-1.701 0l-1.048 1.048a1.205 1.205 0 01-1.701 0l-3.374-3.374a1.205 1.205 0 010-1.701l1.048-1.048a1.205 1.205 0 000-1.701l-2.9-2.9A1.205 1.205 0 003 4.72v3.18"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Phone</h3>
            <p className="text-gray-600">9501317581</p>
          </div>
        </div>

        {/* Email */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4">
          <div className="text-orange-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 12h1a2 2 0 012 2v6a2 2 0 01-2 2H7a2 2 0 01-2-2v-6a2 2 0 012-2h1m8 0v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m8 0H8"
              />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-lg">Email</h3>
            <p className="text-gray-600">helpngrow.hng@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      {/* <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg mb-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Subject"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="number">Number</label>
            <input
              type="text"
              id="number"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2" htmlFor="message">Message</label>
            <textarea
              id="message"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
          >
            Send Message
          </button>
        </form>
      </div> */}

      {/* Google Map Section */}
      <div className="max-w-7xl mx-auto">
        <iframe
          className="w-full h-64 md:h-96 rounded-lg shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.6863541755433!2d144.963160115323!3d-37.81215097975243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b1f36aa93d%3A0x5db1e94e29a71a0b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1635429122452!5m2!1sen!2sau"
          allowFullScreen=""
          loading="lazy"
          title="india"
        ></iframe>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Contact
