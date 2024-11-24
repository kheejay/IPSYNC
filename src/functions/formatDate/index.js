import { format, formatDistanceToNow } from "date-fns";

export function formatDate(date) {
    const today = new Date();
    const givenDate = new Date(date);
    
    const differenceInMilliseconds = today - givenDate;

    const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
    const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

    switch (true) {
        case differenceInMinutes < 60:
            return formatDistanceToNow(givenDate, { includeSeconds: true });

        case differenceInHours <= 12:
            return format(givenDate, "hh:mm bbbb");

        case differenceInDays <= 7:
            return format(givenDate, "E hh:mm bbbb");    

        case differenceInDays <= 30:
            return format(givenDate, "MMM d hh:mm bbbb");

        case differenceInDays <= 365:
            return format(givenDate, "MMM d hh:mm bbbb");

        default:
            return format(givenDate, "MM dd y");
    }
}
