import AuthForm from "../components/form/AuthForm";

function Auth(props) {
	return <AuthForm type={props.type}></AuthForm>;
}

export const getServerSideProps = async (ctx) => {
	const { type } = ctx.query;

	return {
		props: {
			type: type
		}
	};
};

export default Auth;
