import "./Footer.css"

export const Footer = () => (
	<footer className="footer mt-auto py-4 text-center">
		<div className="d-flex mb-5 flex-wrap justify-content-around text-start">
			<section>
				<h5>Easy-Flights</h5>
				<p>Subscribe to our newsletter for the latest updates on features and releases.</p>
				<form>
					<input type="email" name="email" placeholder="Enter your email here..." />
					<button className="ft-btn">Subscribe</button>
				</form>
				<span className="d-block mt-2 small">
					By subscribing, you agree to our <a href="/terms-of-service">Terms of Service</a> and <a href="/privacy-policy">Privacy Policy</a> and consent to receive updates.
				</span>
			</section>
			<section>
				<h5>Quick Links</h5>
				<ul className="list-unstyled">
					<li><a href="/about">About Us</a></li>
					<li><a href="/faqs">FAQs</a></li>
					<li><a href="/support">Support Center</a></li>
				</ul>
			</section>
			<section>
				<h5>Follow Us</h5>
				<ul className="list-unstyled">
					<li><a href="/facebook">Facebook</a></li>
					{/*<li><a href="#">Twitter</a></li>*/}
					<li><a href="/instagram">Instagram</a></li>
					{/*<li><a href="#">LinkedIn</a></li>*/}
					{/*<li><a href="#">YouTube</a></li>*/}
				</ul>
			</section>
		</div>

		<hr />

		<div className="d-flex justify-content-between flex-wrap text-center">
			<section>
				<span>Copyright © 2025 Easy-Flights. All rights reserved.</span>
			</section>
			<section>
				<ul className="d-flex gap-3 list-unstyled justify-content-center">
					<li><a href="/terms-of-service">Terms of Service</a></li>
					<li><a href="/privacy-policy">Privacy Policy</a></li>
					<li><a href="/cookies-policy">Cookie Policy</a></li>
				</ul>
			</section>
		</div>
	</footer>
);
