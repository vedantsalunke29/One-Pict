import React from "react";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

export default function Img({ img }) {
	const cld = new Cloudinary({
		cloud: {
			cloudName: "drdn4lpri",
		},
	});

	const myImage = cld.image(img);
	return <AdvancedImage cldImg={myImage} />;
}
