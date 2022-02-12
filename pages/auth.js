import AuthForm from "../components/form/AuthForm";

function Auth(props) {
	return <AuthForm type={props.type}></AuthForm>;
}

export const getServerSideProps = async (ctx) => {
	const { res } = ctx;
	res.setHeader("Cache-Control", `s-maxage=30, stale-while-revalidate`);
	const { type } = ctx.query;

	return {
		props: {
			type: type
		}
	};
};

export default Auth;
