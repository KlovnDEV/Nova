Table

    {
        "type": "table",
        "name": string,
        "action": string,
        "dark": bool,
        "class": string | array,
    }

Form

    {
        "type": "form",
        "name": string,
        "action": string,
    }

Button

    {
        "type": "button" | "submit" | "reset",
        "size": "large" | "small",
        "class": string | array,
        "text": string,
        "modifier": "primary" | "secondary" | "success", | "danger" | "warning" | "info" | "light" | "dark",
        "disabled": bool
    }

Button Group

    {
        "type": "button-group",
        "children": []
    }
