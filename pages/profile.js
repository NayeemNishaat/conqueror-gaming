import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Spinner from "../components/ui/Spinner";

function Profile() {
	const { data: session } = useSession();
	const router = useRouter(null);

	useEffect(() => {
		if (!session) return router.replace("/");
	}, [session, router]);

	if (!session)
		return (
			<Spinner message="Please wait! If you are not authorized you will be redirected to homepage!" />
		);

	return (
		<section className="mx-auto my-12 py-36 w-[95%] max-w-[30rem] rounded-md bg-[#38015c] shadow-xl p-4 text-center">
			<h1 className="text-center text-4xl text-amber-500">
				Welcome {session.user.name}
			</h1>
			<p className="text-cyan-500">{session.user.email}</p>
		</section>
	);
}

// export const getServerSideProps = async (ctx) => {
// 	const session = await getSession(ctx);

// 	if (!session) return { redirect: { destination: "/", permanent: true } };

// 	return {
// 		props: {
// 			session
// 		}
// 	};
// };

export default Profile;
