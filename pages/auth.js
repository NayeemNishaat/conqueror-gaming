import AuthForm from "../components/form/AuthForm";

function Auth(props) {
	return <AuthForm type={props.type}></AuthForm>;
}

export const getServerSideProps = async (ctx) => {
	const { res } = ctx;
	res.setHeader("Cache-Control", `s-maxage=30, stale-while-revalidate`);
	const { type } = ctx.query;

	if (!type)
		return {
			redirect: {
				destination: "/",
				permanent: true
			}
		};

	return {
		props: {
			type: type || null
		}
	};
};

export default Auth;
