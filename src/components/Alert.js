import "./Alert.css";

const Alert = (props) => {
    const capitalize = (word) => {
        if (word === "warning") return "Info";
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        props.alert && (
            <div
                className={`alert alert-${props.alert.type} alert-dismissible fade show`}
                role="alert"
            >
                <strong>{capitalize(props.alert.type)}: </strong>
                {props.alert.message}
            </div>
        )
    );
};

export default Alert;
