"use client"

import "./AppDownload.css"

const AppDownload = () => {
  const appFeatures = [
    {
      icon: "📱",
      title: "Mobile First",
      description: "Optimized for iOS and Android devices",
    },
    {
      icon: "🔄",
      title: "Sync Across Devices",
      description: "Your designs sync between phone, tablet, and web",
    },
    {
      icon: "📴",
      title: "Offline Mode",
      description: "Browse and plan even without internet",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description: "Get alerts for sales, new arrivals, and restocks",
    },
  ]

  const handleDownload = (platform) => {
    // In a real app, these would be actual store links
    alert(`Redirecting to ${platform} store... (This is a demo)`)
  }

  return (
    <section id="download" className="section app-download">
      <div className="container">
        <div className="download-content">
          <div className="download-text slide-in-left">
            <h2>Get the A.F.O. Furnitures App</h2>
            <p>
              Experience the future of furniture shopping with our award-winning mobile app. Available for iOS and
              Android devices.
            </p>

            <div className="app-stats">
              <div className="stat">
                <h3>50K+</h3>
                <p>Downloads</p>
              </div>
              <div className="stat">
                <h3>4.8★</h3>
                <p>Rating</p>
              </div>
              <div className="stat">
                <h3>25+</h3>
                <p>Countries</p>
              </div>
            </div>

            <div className="download-buttons">
              <button className="download-btn app-store" onClick={() => handleDownload("App Store")}>
                <div className="btn-content">
                  <span className="btn-icon">🍎</span>
                  <div className="btn-text">
                    <span className="btn-subtitle">Download on the</span>
                    <span className="btn-title">App Store</span>
                  </div>
                </div>
              </button>

              <button className="download-btn google-play" onClick={() => handleDownload("Google Play")}>
                <div className="btn-content">
                  <span className="btn-icon">📱</span>
                  <div className="btn-text">
                    <span className="btn-subtitle">Get it on</span>
                    <span className="btn-title">Google Play</span>
                  </div>
                </div>
              </button>
            </div>

            <div className="qr-section">
              <div className="qr-code">
                <img src="/placeholder.svg?height=120&width=120" alt="QR Code" />
              </div>
              <div className="qr-text">
                <h4>Scan to Download</h4>
                <p>Point your camera at the QR code to get the app instantly</p>
              </div>
            </div>
          </div>

          <div className="download-features slide-in-right">
            <div className="phone-mockup">
              <img src="/placeholder.svg?height=600&width=300" alt="App Screenshot" />
            </div>

            <div className="feature-highlights">
              {appFeatures.map((feature, index) => (
                <div key={index} className="feature-highlight fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="app-preview">
          <h3>App Screenshots</h3>
          <div className="screenshot-gallery">
            <div className="screenshot">
              <img src="/placeholder.svg?height=400&width=250" alt="Home Screen" />
              <h4>Home Screen</h4>
            </div>
            <div className="screenshot">
              <img src="/placeholder.svg?height=400&width=250" alt="AR View" />
              <h4>AR Visualization</h4>
            </div>
            <div className="screenshot">
              <img src="/placeholder.svg?height=400&width=250" alt="Room Planner" />
              <h4>Room Planner</h4>
            </div>
            <div className="screenshot">
              <img src="/placeholder.svg?height=400&width=250" alt="Product Comparison" />
              <h4>Product Comparison</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppDownload
