export async function processConversation(aiResponse) {
    const{
        intent,
        reciever,
        amount,
        purpose,
        missingFields,

    }= aiResponse;
    
    switch(intent){

        case "payment":
            return handlePayment(
                reciever, 
                amount, 
                purpose, 
                missingFields
            );
        case "balance":

            return handleBalance();

        case "history":

            return handleHistory();

        case "financial_coach":

            return handleCoach();

        case "help":

            return handleHelp();

        case "greeting":

            return handleGreeting();

        default:

            return {
                success:false,
                message:"Sorry, I couldn't understand your request."
            }

    }

}