import Toastify from 'toastify-js'
const toast = (message = "Request success!", gravity = "top", duration = "1000",
            left = "#113567", right = "#184c95", color = "#FFFFFF") => {
    return (
        Toastify({
            text: message,
            duration: duration,
            newWindow: true,
            close: false,
            gravity: gravity, // `top` or `bottom`
            // position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: `linear-gradient(to right, ${left}, ${right})`,
                position: "fixed",
                left: "0",
                "padding-left": "3rem",
                "padding-right": "4rem",
                "padding-top": "1rem",
                "padding-bottom": "1rem",
                display: "flex",
                gap: "2rem",
                color: `${color}`,
                'z-index': '10',
            },
        onClick: function(){} // Callback after click
        }).showToast()
    )
}

export { toast }