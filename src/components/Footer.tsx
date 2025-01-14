export default function Footer() {
  return (
    <div className="footer">
      <div className="sb_footer section_padding">
        <div className="sb_footer-links">
          <div className="sb_footer-links_div">
            <h4>For Bussines</h4>
            <a href="">
              <p>Employer</p>
            </a>
            <a href="">
              <p>Healt Plan</p>
            </a>
            <a href="">
              <p>Individual</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Resource</h4>
            <a href="">
              <p>Resource Center</p>
            </a>
            <a href="">
              <p>Testimonial</p>
            </a>
            <a href="">
              <p>Employer</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Partner</h4>
            <a href="">
              <p>Swing Tech</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Company</h4>
            <a href="">
              <p>About</p>
            </a>
            <a href="">
              <p>Press</p>
            </a>
            <a href="">
              <p>Career</p>
            </a>
            <a href="">
              <p>Contact</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>Hit me on</h4>
            <div className="socialmedia">
              <img src="/assets/images/icons/smartphone.svg" alt="wa" />

              <img src="/assets/images/icons/twitter.svg" alt="twiter" />

              <img src="/assets/images/icons/instagram.svg" alt="instagram" />

              <img src="/assets/images/icons/linkedin.svg" alt="linkdin" />
            </div>
          </div>
        </div>

        <hr />

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>@{new Date().getFullYear()} CodeInn. All Right Reserved.</p>
          </div>
          <div className="sb_footer-below-links">
            <a href="#">
              <div>
                <p>Terms & Condition</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Privacy</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Security</p>
              </div>
            </a>
            <a href="#">
              <div>
                <p>Cookie Declaration</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
