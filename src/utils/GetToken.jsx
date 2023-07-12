const extractToken = () => {
	return `Bearer ${localStorage.getItem("token")}`;
}

export default extractToken;