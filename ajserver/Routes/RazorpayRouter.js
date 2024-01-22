const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/orders", (req, res) => {
	try {
		const instance = new Razorpay({
			key_id:"rzp_test_PPpXOt0wGw2KLn",
			key_secret:"GvikLaN1dG9Ng9vPBf9dDIEC"
		});

		const options = {
			amount: req.body.amount * 100,
			currency: "INR",
			receipt: crypto.randomBytes(10).toString("hex"),
		};
    console.log(options)

		instance.orders.create(options, (error, order) => {
			if (error) {
				console.log(error);
				return res.status(500).json({ message: "Something Went Wrong!" });
			}
			console.log('order', order);
			res.status(200).json({ data: order });
		});
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

router.post("/verify", (req, res) => {
  console.log(req.body);
	try {
		const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
			req.body;
		const sign = razorpay_order_id + "|" + razorpay_payment_id;
		const expectedSign = crypto
			.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
			.update(sign.toString())
			.digest("hex");

		if (razorpay_signature === expectedSign) {
			return res.status(200).json({ message: "Payment verified successfully" });
		} else {
			return res.status(400).json({ message: "Invalid signature sent!" });
		}
	} catch (error) {
		res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
	}
});

module.exports = router;