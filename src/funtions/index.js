import Toastify from 'toastify-js'
const toast = (message = "Request success!", left = "#113567", right = "#184c95", color = "#FFFFFF") => {
    return (
        Toastify({
            text: message,
            duration: 1000,
            newWindow: true,
            close: true,
            // gravity: "top", // `top` or `bottom`
            // position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: `linear-gradient(to right, ${left}, ${right})`,
                position: "absolute",
                left: "0",
                padding: "1rem",
                display: "flex",
                gap: "2rem",
                color: `${color}`
            },
        onClick: function(){} // Callback after click
        }).showToast()
    )
}

export { toast }