exports.sendContactEnquiryTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Contact Enquiry</title>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap");

        * {
            font-family: 'Playfair Display', serif;
            font-style: normal;
        }

        body {
            margin: 0;
            padding: 0;
            font-family: "Playfair Display", serif;
            background-color: #ffffff !important;
            color: #000000 !important;
        }

        .email-container {
            max-width: 650px;
            margin: auto;
            background-color: #fafafa;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 1px 5px 10px #b9b9b9 !important;
            border: none !important;
        }

        .content {
            padding: 30px;
            margin: 10px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 1px 1px 10px #e0e0e0;
        }

        .content h1 {
            color: #272423;
            font-size: 30px;
            margin-bottom: 20px;
            font-weight: bold;
        }

        .content p {
            font-size: 14px;
            line-height: 1.5;
            margin-bottom: 20px;
        }

        @media (max-width: 560px) {
            .content {
                padding: 20px;
            }
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="content" style="background-color: #fff">
            <b style="padding-bottom: 5px; display: block; font-size: medium">Hi Rohit,</b>

            <p style="display: block">
                You have received a new contact enquiry, someone has tried to made contact with you, we have listed
                details below
            </p>

            <p style="font-size: 14px">
                <span style="font-weight: 800;">Name</span> : <span>{name}</span>
            </p>
            <p style="font-size: 14px">
                <span style="font-weight: 800;">Email</span> : <span>{email}</span>
            </p>
            <p style="font-size: 14px">
                <span style="font-weight: 800;">IP Address</span> : <span>{ip}</span>
            </p>
            <p style="font-size: 14px">
                <span style="font-weight: 800;">Message</span> <br /><span style="padding-top: 10px;">{message}</span>
            </p>

            <p style="
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: medium;
          ">
                <b>Regards <br /> Your website</b>
            </p>
        </div>
        <div style="text-align: center; font-size: small; padding: 10px;">2025 © All rights reserved.</div>
    </div>
</body>

</html>
`;
