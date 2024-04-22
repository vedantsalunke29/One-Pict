import React, { useEffect, useState } from "react";
import IEEE from "../assets/pisbieee.jpeg";
import CSI from "../assets/CSI.jpg";
import ACM from "../assets/ACM.png";
import GameDev from "../assets/gamedevutopia_logo.jpg";
import PAC from "../assets/PAC.png";
import PIC from "../assets/pictoreal.png";
import { Link } from "react-router-dom";

export default function ClubInfo() {
	const [data, setData] = useState({ name: "", info: "", link: "", logo: "" });
	useEffect(() => {
		let clubName = JSON.parse(sessionStorage.getItem("ClubInfo"));
		showClub(clubName);
	}, []);
	const showClub = (clubName) => {
		switch (clubName) {
			case "IEEE":
				setData({
					name: "PISB Club",
					info: "PICT IEEE Student Branch (PISB) was established in the year 1988 with an aim of inculcating a sense of technical awareness amongst its student members. PISB aims to escalate the knowledge and trends in the diverse fields of technologies amongst its members. PISB upholds two major events every year - Credenz and Credenz Tech Dayz with the first one being conducted in odd semester and the latter one in even semester. PISB is also marked by its Women in Engineering (WIE) chapter, an initiative for empowerment of women.",
					link: "https://www.pictieee.in/",
					logo: IEEE,
				});
				break;
			case "ACM":
				setData({
					name: "PASC Club",
					info: "PICT ACM Student Chapter(PASC), a student chapter organization subsidiary of the Association for Computing Machinery(ACM), consists of highly motivated students, ready to learn and help each other bring the best out of them.\nPASC-W is a special wing of PASC which organizes its event different events to promote diversity in technology. Through PASC-W we encourage gender equality and women empowerment. PASC-W promotes full engagement of women in the technical as well as non-technical domains. Through its collaborations and initiatives, PASC-W provides a large range of services to all ACM members along with pushing the advancement of contribution of women in the field of computing.",
					link: "https://pict.acm.org/",
					logo: ACM,
				});
				break;
			case "GameDevUtopia":
				setData({
					name: "GameDevUtopia Club",
					info: "GameDevutopia is the official game development club of SCTRs Pune Institute of Computer Technology and is one its kind in the city. The club's objective is to make people aware of the various aspects of game development and its relevance in today's world and to provide a platform for people interested in game development to discuss and share ideas on collaborative projects.\nGameDevUtopia is a student-run Game Developers Community in India. We were founded as a humble trio of passionate Game Developers in the year 2020 at PICT, Pune and today have become one of the fastest growing student-run community. We have our branches across PICT, Pune and IIIT Kottayam with plans to expand and reach multiple colleges across the country. In both of our student chapters, we have following teams to handle different aspects of game development!",
					link: "https://gamedevutopia.in/",
					logo: GameDev,
				});
				break;
			case "PAC":
				setData({
					name: "PICT Automobile Club",
					info: "PICT Automobile Club provides a platform for students to indulge in their passion for motorsports. It is an opportunity for students to get hands-on experience, instead of just watching from the side-lines. Electronics, mechanical, coding, management heads - are formed here because, PAC is a place for all!Learn to build competitive racing EVs and compete at the national level. From a 3D model on a computer screen to a tangible reality - find yourself immersed in the thrill of the racetrack every single day; all while learning, exploring, experimenting along the way.\nEstablished in April'21 PICT Automobile Club aims to promote motor sports culture.",
					link: "https://torqscrew.netlify.app/",
					logo: PAC,
				});
				break;
			case "CSI":
				setData({
					name: "PSCB Club",
					info: "Pune Institute of Computer Technology (PICT) CSI Student Branch was established in 2016 with an objective to facilitate research, knowledge sharing, learning and career enhancement for the students, while simultaneously inspiring and nurturing new entrants into the industry and helping them to integrate into the IT Community.\nPCSB works under Computer Society of India (CSI) to provide latest technology related knowledge to students. PCSB started with 147 student members in academic year 2016-2017.\nPCSB arranges events like Codeventure, Blind coding and different types of workshops (conducted by industry experts) throughout the year.. PCSB also arranges Enthusia's Very Year",
					link: "https://www.pictcsi.com/",
					logo: CSI,
				});
				break;
			case "PIC":
				setData({
					name: "Pictoreal Club",
					info: "Pictoreal is one of the non-technical clubs in PICT. At Pictoreal, we create and publish an annual magazine of PICT with unique themes every year. Pictoreal organizes several enthusiastic events throughout the year to boost creative minds. The club always focuses on promoting one’s skills in literature, design, and photography. The club always supports individuals to build practical skills like event management, public oration, teamwork, and much more. To enhance one's productive skills, we organize multiple events like Pics-o-Reel, an annual art and photography exhibition-cum-competition where students can showcase their art pieces, and Manthan, an event to promote public speaking skills which consists of mini-events like extempore, debates, group discussions, etc. Pictosocial, a subgroup of Pictoreal believes the culture in PICT to lose ourselves in the service of others until we discover our own lives and our happiness. To promote the same, we organize events like Tree plantation drives, blood donation and Monetary donation drives, and Old-age home or Orphanage visits. ",
					link: "https://www.pictoreal.in/",
					logo: PIC,
				});
				break;

			default:
				break;
		}
	};

	return (
		<>
			<div className="main-club-info-div">
				<div className="club-name-div">
					<img src={data.logo} />
					<h1>{data.name}</h1>
				</div>
				<div className="club-info-div">
					<p>{data.info}</p>
					<p>
						<Link to={data.link}>{data.link}</Link>
					</p>
				</div>
			</div>
		</>
	);
}
