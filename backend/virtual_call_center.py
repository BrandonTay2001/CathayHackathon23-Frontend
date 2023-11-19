import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words('english'))
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token.isalnum()]
    tokens = [token for token in tokens if token not in stop_words]
    return ' '.join(tokens)


faq_data = [
    (
        "Can I change my bookings online?", '''Yes, you can change your bookings online for tickets purchased from Cathay Pacific.

Note 1: In case of system error, please contact our Customer Care for assistrance.

Note 2: Rebooking may not be allowed, or may incur additional fees, subject to the fare rules of your ticket.

Note 3: Changes of date and/or flight can be made for itinerary involving the same routes.'''
    ),
    (
        "I cannot find the “Change flight(s)” button in my flight booking details on Manage Booking. What should I do?",
        "This happens when the booking in question is not eligible for changes online. Please contact Cathay Pacific Reservations Office for assistance."
    ),
    (
        "How do I make changes to my bookings?",
        "You can make changes via Manage Booking if your bookings are made on our website. A “Change flight(s)” button will appear under your booking details, once our system verifies your eligibility."
    ),
    (
        "How do I know that if the flight date and/or time has been successfully changed?",
        "You will receive a confirmation email shortly after completing the change request."
    ),
    (
        "Can I change the dates and/or flights for some of the passengers under the same booking?",
        '''Yes, you can change the dates and/or flights for some of the passengers in a booking with multiple passengers.

Simply follow the below steps to split your booking and make changes:

Log into Manage Booking 
Go to ‘Change Flights’ and select the passenger(s) whose ticket(s) you wish to alter
Select the applicable dates(s) and flight(s)
Enter the contact information for the relevant passenger(s)
A new booking reference is generated, and the updated email address(es) will receive the split booking confirmation email'''
    ),
    (
        "Can I change my bookings online if I have purchased my tickets via a travel agent?",
        "If you purchased your ticket through a travel agent or a third-party website, please contact them directly to organise your change."
    ),
    (
        "Can I change my bookings online if I have completed online check-in?",
        "You are required to cancel the check-in via Manage Booking before you make any changes to your bookings online."
    ),
    (
        "Can I change my bookings online if my itinerary involves connecting flights with other carriers?",
        "You can make changes to your bookings provided that your bookings are made directly through Cathay Pacific channels (either the Cathay Pacific website or mobile app)."
    ),
    (
        "When paying additional fees for changes of bookings, do I have to pay with the same credit card used for the original bookings?",
        "No, you are not required to pay with the same credit card. However, you may be asked to present the physical credit card(s) charged for the tickets for verification purpose upon check-in."
    ),
    (
        "Can I make seat requests when I change my bookings online?",
        '''In accordance with the fare rules of your ticket, you may reserve your preferred seats free of charge (except for Reserve Your Seat products) when changing bookings.

Alternatively, customers can reserve their seats via Manage Booking. For details, please refer to "Booking and manage - Seat Request" section of Frequently Asked Questions.

To understand more about Reserve Your Seat, please refer to "Reserve Your Seat" product page.'''
    ),
    (
        "I have not received my e-ticket receipt after changing my bookings online. What should I do?",
        "The revised e-ticket should be sent to the email address provided within an hour. The e-ticket can also be found in Manage Booking. Please contact our Customer Care for assistance if the e-ticket cannot be located."
    ),
    (
        "Can I cancel a flight for only certain passengers within the same booking?",
        "No, you can't partially cancel a booking online. If you need to cancel a booking for specific passengers, please contact Customer Care. Alternatively, you can cancel the entire booking and rebook for remaining passengers."
    ),
    (
        "How can I request for cancellation and refund?",
        '''For tickets purchased from Cathay Pacific, please process cancellations and refunds via Manage Booking.

For tickets purchased through travel agents, please contact your travel agent.

For redemption tickets, other ticket and ancillary enquiries, please contact our Customer Care.'''
    ),
    (
        "Can I get a refund from a partially used ticket?",
        "Subject to fare rules, tickets that qualify for a partial refund will be refunded to the credit card or bank account charged to the original ticket. Our staff will contact you for details if necessary."
    ),
    (
        "How long will my refund take for booking changes made online?",
        '''It normally takes up to 7 calendar days for us to process your refund request.

However, if your booking includes [interline services | or | interline flights] or more information is needed to process your refund (i.e. credit card used for the purchase has expired and your bank account details are needed instead), the processing time will take longer.'''
    ),
    (
        "Where can I seek assistance when I have problems on changing the bookings?",
        "You may contact Cathay Pacific Reservations Office or Customer Care."
    ),
    (
        "How long will my refund take for booking changes made online?",
        '''It normally takes up to 7 calendar days for us to process your refund request.

However, if your booking includes [interline services | or | interline flights] or more information is needed to process your refund (i.e. credit card used for the purchase has expired and your bank account details are needed instead), the processing time will take longer.'''
    ),
    (
        "Within what range of time can I cancel a reservation without a penalty?",
        '''Notwithstanding any contrary booking terms and conditions and/or fare rules, for online bookings made via our US websiteOpen a new window, and seven days before departure, you may cancel the paid reservations within 24 hours after the booking creation date for a full refund via Manage Booking.

The seven-day refund policy of the Taiwan Consumer Protection Act does not apply to bookings made with an international airline company. For ticket changes, cancellation and refunds, customers should refer to the terms and conditions and/or fare rules of each booking.

Cathay members who purchased their ticket through Cathay Pacific – on our website or mobile app – can cancel their ticket free of charge within 24 hours through Manage Booking. Visit 24-hour free cancellation to learn more.
'''
    ),
    (
        "How long would it take to get the refund if I cancel my fully unused or partially used ticket?",
        '''It normally takes up to 7 calendar days for us to process your refund request. For further details, please visit our Change, cancel or refund your flight page.

Please note that the time required for the actual refund to reach your account will depend on individual banks and payment service providers.

For tickets purchased from Cathay Pacific and redemption ticket, please process cancellations and refunds via Manage Booking.

For tickets purchased through travel agents, please contact your travel agent.

However, if your booking includes interline flights or more information is needed to process your refund (i.e. credit card used for the purchase has expired and your bank account details are needed instead), the processing time will take longer.'''
    ),
    (
        "When will it take more than seven days for my refund to be processed?",
        '''It normally takes up to 7 calendar days for us to process your refund request.

However, if your booking includes [interline services | or | interline flights] or more information is needed to process your refund (i.e. credit card used for the purchase has expired and your bank account details are needed instead), the processing time will take longer.'''
    )
]

preprocessed_questions = []
answers = []

for question, answer in faq_data:
    preprocessed_question = preprocess_text(question)
    preprocessed_questions.append(preprocessed_question)
    answers.append(answer)

vectorizer = TfidfVectorizer()
faq_vectors = vectorizer.fit_transform(preprocessed_questions)


def get_answer(user_question):
    preprocessed_user_question = preprocess_text(user_question)
    user_question_vector = vectorizer.transform([preprocessed_user_question])
    similarities = cosine_similarity(user_question_vector, faq_vectors)
    most_similar_index = similarities.argmax()
    answer = answers[most_similar_index]
    return answer
