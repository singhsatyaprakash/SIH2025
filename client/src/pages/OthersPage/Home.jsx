import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-green-500 text-white min-h-[70vh] flex items-center justify-center text-center px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold">
            Smart Tourist Safety <span className="text-orange-400">Monitoring System</span>
          </h1>
          <p className="mt-4 text-lg">
            Blockchain-powered digital IDs, real-time monitoring, and AI-driven safety alerts
            for tourists across India.
          </p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center space-x-4">
            <Link
              to="/tourist/registration"
              className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Tourist Registration
            </Link>
            <Link
              to="/authority/dashboard"
              className="bg-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
              Authority Access
            </Link>
          </div>
        </div>
      </section>
    {/* Features Section */}
      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Complete Safety Ecosystem</h2>
        <p className="text-center text-gray-600 mb-12">
          Comprehensive digital infrastructure connecting tourists, authorities, and stakeholders
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl text-blue-600 mb-4">📱</div>
            <h3 className="font-bold text-xl">Blockchain Digital ID</h3>
            <p className="text-gray-600 mt-2">
              Secure, tamper-proof tourist identification with QR verification
            </p>
            <ul className="mt-4 text-gray-500 text-sm space-y-1">
              <li>• Instant verification at hotels & checkpoints</li>
              <li>• Valid only for trip duration</li>
              <li>• Emergency contact integration</li>
            </ul>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl text-green-600 mb-4">📍</div>
            <h3 className="font-bold text-xl">Geo-Fencing & Alerts</h3>
            <p className="text-gray-600 mt-2">
              Real-time location monitoring with safety zone alerts
            </p>
            <ul className="mt-4 text-gray-500 text-sm space-y-1">
              <li>• Red zone warnings</li>
              <li>• Route safety scoring</li>
              <li>• Auto-alerts to authorities</li>
            </ul>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl text-orange-500 mb-4">⚠️</div>
            <h3 className="font-bold text-xl">Emergency Response</h3>
            <p className="text-gray-600 mt-2">
              One-tap panic button with instant location sharing
            </p>
            <ul className="mt-4 text-gray-500 text-sm space-y-1">
              <li>• Direct police notification</li>
              <li>• Family alert system</li>
              <li>• Incident reporting portal</li>
            </ul>
          </div>
        </div>

        {/* Second Row Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl text-blue-600 mb-4">👥</div>
            <h3 className="font-bold text-xl">Multi-Stakeholder Platform</h3>
            <p className="text-gray-600 mt-2">
              Unified system for police, hotels, and government authorities
            </p>
            <ul className="mt-4 text-gray-500 text-sm space-y-1">
              <li>• Police monitoring dashboard</li>
              <li>• Hotel verification tools</li>
              <li>• Government oversight panel</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl text-green-600 mb-4">🛡️</div>
            <h3 className="font-bold text-xl">AI Anomaly Detection</h3>
            <p className="text-gray-600 mt-2">
              Smart monitoring for unusual patterns and missing persons
            </p>
            <ul className="mt-4 text-gray-500 text-sm space-y-1">
              <li>• Unusual activity detection</li>
              <li>• Missing person alerts</li>
              <li>• Predictive safety scoring</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">
            <div className="text-4xl text-orange-500 mb-4">🌐</div>
            <h3 className="font-bold text-xl">Multilingual Support</h3>
            <p className="text-gray-600 mt-2">
              Available in 10+ Indian languages with voice assistance
            </p>
            <ul className="mt-4 text-gray-500 text-sm space-y-1">
              <li>• Local language interface</li>
              <li>• Voice emergency access</li>
              <li>• Cultural guidance system</li>
            </ul>
          </div>
        </div>
      </section>
      {/* Call-to-Action Section */}
      <section className="bg-blue-700 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to Enhance Tourist Safety?</h2>
        <p className="mb-6">
          Join the digital revolution in tourist safety. Get started with secure digital IDs and
          comprehensive monitoring today.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/tourist/registration"
            className="bg-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
          >
            Register as Tourist
          </Link>
          <Link
            to="/authority/dashboard"
            className="bg-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
          >
            Authority Access
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Home;
