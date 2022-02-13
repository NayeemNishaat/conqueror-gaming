import { getSession, useSession } from "next-auth/react";

function Profile() {
	const { data: session } = useSession();

	return (
		<section className="mx-auto my-12 py-36 w-[95%] max-w-[30rem] rounded-md bg-[#38015c] shadow-xl p-4 text-center">
			<h1 className="text-center text-4xl text-amber-500">
				Welcome {session.user.name}
			</h1>
			<p className="text-cyan-500">{session.user.email}</p>
		</section>
	);
}

export const getServerSideProps = async (ctx) => {
	const session = await getSession(ctx);

	return {
		props: {
			session
		}
	};
};

export default Profile;
