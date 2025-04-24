import "./Footer.css"

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-center">
		<div className="d-flex mb-5 flex-wrap justify-content-around text-start">
			<section>
				<h5>Easy-Flights</h5>
				<p>Subscribe to our newsletter for the latest updates on features and releases.</p>
				<form>
					<input type="email" name="email" placeholder="Enter your email here..." />
					<button className="ft-btn">Subscribe</button>
				</form>
				<span className="d-block mt-2 small">
					By subscribing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a> and consent to receive updates.
				</span>
			</section>
			<section>
				<h5>Quick Links</h5>
				<ul className="list-unstyled">
					<li><a href="#">About Us</a></li>
					<li><a href="#">Contact Us</a></li>
					<li><a href="#">Blog Posts</a></li>
					<li><a href="#">FAQs</a></li>
					<li><a href="#">Support Center</a></li>
				</ul>
			</section>
			<section>
				<h5>Connect With Us</h5>
				<ul className="list-unstyled">
					<li><a href="#">Newsletter</a></li>
					<li><a href="#">Events</a></li>
					<li><a href="#">Partnerships</a></li>
					<li><a href="#">Careers</a></li>
					<li><a href="#">Testimonials</a></li>
				</ul>
			</section>
			<section>
				<h5>Follow Us</h5>
				<ul className="list-unstyled">
					<li><a href="#">Facebook</a></li>
					<li><a href="#">Twitter</a></li>
					<li><a href="#">Instagram</a></li>
					<li><a href="#">LinkedIn</a></li>
					<li><a href="#">YouTube</a></li>
				</ul>
			</section>
		</div>

		<hr />

		<div className="d-flex justify-content-between flex-wrap text-center">
			<section>
				<span>Copyright © 2022 Easy-Flights. All rights reserved.</span>
			</section>
			<section>
				<ul className="d-flex gap-3 list-unstyled justify-content-center">
					<li><a href="#">Terms of Service</a></li>
					<li><a href="#">Privacy Policy</a></li>
					<li><a href="#">Cookie Policy</a></li>
				</ul>
			</section>
		</div>
	</footer>
);
