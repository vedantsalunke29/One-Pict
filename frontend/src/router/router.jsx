import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Home from "../components/Home";
import Buy from "../components/Buy";
import Sell from "../components/Sell";
import Navi from "../components/Navi";
import Buysell from "../components/Buysell";
import Signup from "../components/Signup";
import SignIn from "../components/SignIn";
import Cookies from "js-cookie";
import Account from "../components/Account";
import ForgotPass from "../components/ForgotPass";
import ResetPassword from "../components/ResetPassword";
import YourProduct from "../components/YourProduct";
import DisplayProduct from "../components/DisplayProduct";
import ManageContent from "../components/ManageContent.jsx";
import UploadContent from "../components/UploadContent.jsx";
import Club from "../components/Club.jsx";
import DisplayEvent from "../components/DisplayEvent.jsx";
import ClubInfo from "../components/ClubInfo.jsx";
import Contact from "../components/Contact.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Teacher from "../components/Teacher.jsx";
import Notes from "../components/Notes.jsx";
import NotesDisplay from "../components/NotesDisplay.jsx";
import Announcement from "../components/Announcement.jsx";
import DisplayNotice from "../components/DisplayNotice.jsx";

export default function Router() {
	const [cookieVal, setCookieVal] = useState(Cookies.get("regIdNo"));

	useEffect(() => {
		const interval = setInterval(() => {
			const updatedCookie = Cookies.get("regIdNo");
			if (updatedCookie !== cookieVal) setCookieVal(updatedCookie);
		}, 1000);

		return () => clearInterval(interval);
	}, [cookieVal]);

	return (
		<BrowserRouter>
			<Navi />
			<Routes>
				<Route
					path="/"
					element={<Home />}
				/>
				<Route
					path="/buy"
					element={<Buy />}
				/>
				<Route
					path="/product-page"
					element={<DisplayProduct />}
				/>
				<Route
					path="/event-page"
					element={<DisplayEvent />}
				/>
				<Route
					path="/sell"
					element={<Sell />}
				/>
				<Route
					path="/buy-sell"
					element={<Buysell />}
				/>

				<Route
					path="/forgot-password"
					element={<ForgotPass />}
				/>
				<Route
					path="/reset-password"
					element={<ResetPassword />}
				/>
				<Route
					path="/club-info"
					element={<ClubInfo />}
				/>
				<Route
					path="/contact"
					element={<Contact />}
				/>
				<Route
					path="/about-us"
					element={<AboutUs />}
				/>
				<Route
					path="/notes-page"
					element={<NotesDisplay />}
				/>
				<Route
					path="/view-announcement"
					element={<DisplayNotice />}
				/>
				{cookieVal === undefined && (
					<>
						<Route
							path="/signup"
							element={<Signup />}
						/>
						<Route
							path="/signin"
							element={<SignIn />}
						/>
					</>
				)}
				{cookieVal !== undefined &&
					!cookieVal.includes("CB") &&
					!cookieVal.includes("T") && (
						<>
							<Route
								path="/my-profile"
								element={<Account />}
							/>
							<Route
								path="/your-products"
								element={<YourProduct />}
							/>
						</>
					)}

				{cookieVal !== undefined && cookieVal.includes("CB") && (
					<>
						<Route
							path="/club-my-profile"
							element={<Club />}
						/>
						<Route
							path="/manage-content"
							element={<ManageContent />}
						/>
						<Route
							path="/upload-content"
							element={<UploadContent />}
						/>
					</>
				)}
				{cookieVal !== undefined && cookieVal.includes("T") && (
					<>
						<Route
							path="/teacher-profile"
							element={<Teacher />}
						/>
						<Route
							path="/teachers-notes-page"
							element={<Notes />}
						/>
						<Route
							path="/make-new-accouncement"
							element={<Announcement />}
						/>
						<Route
							path="/your-products"
							element={<YourProduct />}
						/>
					</>
				)}
			</Routes>
			<Toaster />
		</BrowserRouter>
	);
}
