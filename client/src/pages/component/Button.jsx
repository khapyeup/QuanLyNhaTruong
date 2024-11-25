const Button = ({children, textColor, bgColor}) => {
    return <button className={`${bgColor || `bg-gray-600`} ${textColor || `text-white`} p-2 rounded hover:bg-gray-700`}>
        {children}
    </button>
}

export default Button;