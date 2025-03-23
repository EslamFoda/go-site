export const pricing = [
  {
    sections: [
      {
        id: "3ec6f59c-9759-4500-99a9-fff693cfe1ee",
        style: {
          designName: "design1",
          designSettings: {
            align: "center",
            video: true,
            border: false,
            height: {
              mobile: 350,
              desktop: 400,
            },
            mobile: "flex-col-reverse",
            spacing: {
              gap: {
                mobile: 20,
                desktop: 50,
              },
              top: {
                mobile: 25,
                desktop: 50,
              },
              bottom: {
                mobile: 25,
                desktop: 50,
              },
              padding: {
                mobile: 10,
                desktop: 20,
              },
            },
            showForm: false,
            showVideo: false,
            titleSize: "xl",
            background: true,
            showButtons: false,
            imageSetting: {
              objectFit: "cover",
              showImage: false,
              backgroundColor: "primary",
            },
            subtitleWidth: "50%",
            leftTitleWidth: "50%",
            leftTitlePosition: false,
            sectionBackground: {
              blur: false,
              color: "none",
              media: {
                imageId: "",
                imageUrl: "",
              },
              width: "fill",
              height: "fit",
              overlay: false,
              spacing: "xl",
              parallax: false,
              greyScale: false,
              textColor: "light",
              blurEffect: "s",
              overlayEffect: "s",
            },
          },
        },
        content: {
          form: {
            button: {
              id: "6e623d7e-3adf-4c70-ab74-b31fddab7944",
              link: "",
              text: "Sign Up",
            },
            fields: [
              {
                id: "a100ed0d-9c05-4257-ad1a-db85f5147b9e",
                type: "text",
                label: "First name",
                value: "First name",
                active: false,
                required: false,
                placeholder: "First name",
              },
              {
                id: "980f6c54-70ce-468b-8f3f-24b95c21fce7",
                type: "text",
                label: "Last name",
                value: "Last name",
                active: false,
                required: false,
                placeholder: "Last name",
              },
              {
                id: "2b000b31-d6a6-484e-acd3-a8ac88abfb6f",
                type: "email",
                label: "Email",
                value: "Email",
                active: true,
                required: true,
                placeholder: "Email",
              },
              {
                id: "533e7bd3-b527-4051-be2c-db291b6f7e0b",
                type: "tel",
                label: "Phone",
                value: "Phone",
                active: false,
                required: false,
                placeholder: "Phone",
              },
              {
                id: "149e69a8-7e24-4d63-9d74-7452af22e005",
                type: "textarea",
                label: "Message",
                value: "Message",
                active: false,
                required: false,
                placeholder: "Message",
              },
            ],
            countryCode: {
              code: "US",
              flag: "🇺🇸",
              name: "United States",
              dialCode: "+1",
            },
            successMessage: "Thank you! Your submission has been received",
          },
          label: "",
          title: "Pricing",
          buttons: [
            {
              id: "3061d89e-a89c-4119-b4d4-721d1a53121a",
              link: "",
              text: "button 1",
              pageId: "",
              linkType: "internal",
              openNewTab: false,
              externalLink: "",
            },
            {
              id: "a9890b9d-7345-4516-93e4-2b8eebb3a6e0",
              link: "",
              text: "button 2",
              pageId: "",
              linkType: "internal",
              openNewTab: false,
              externalLink: "",
            },
          ],
          subtitle:
            "Inform customers about  the value offered, highlighting a unique selling proposition or why your pricing is competitive.",
          mediaType: "image",
          actionType: "form",
          imageSetting: {
            altText: "",
            imageUrl: "",
          },
          videoSetting: {
            videoUrl: "",
          },
        },
        sectionName: "Banner",
      },
      {
        id: "fbe79e17-154a-467b-ad38-850c3793f7b4",
        sectionName: "Pricing",
        content: {
          label: "",
          title: "",
          subtitle: "",
          currency: {
            code: "USD",
            name: "US Dollar",
            symbol: "$",
          },
          planType: "Subscription",
          subscriptionPlans: [
            {
              billingCycle: "Monthly",
              cycleDuration: "/month",
              default: true,
            },
            {
              billingCycle: "Yearly",
              cycleDuration: "/year",
              default: false,
            },
            {
              billingCycle: "",
              cycleDuration: "",
              default: false,
            },
          ],
          subscriptions: [
            {
              id: "2059b708-8de5-48da-a008-9e182f2d01ac",
              title: "Basic",
              text: "",
              benefits: [
                {
                  id: "0d7715c1-879b-4fa2-a75c-60a3c38f91ff",
                  title: "Add Benefit 1",
                },
                {
                  id: "901b75f3-9b30-4dfc-853d-0fae6d176caa",
                  title: "Add Benefit 2",
                },
                {
                  id: "d0dddc00-613d-4771-a76e-d372febca776",
                  title: "Add Benefit 3",
                },
              ],
              oneTimePlan: {
                id: "20ad9ae0-d483-4a5a-8edc-95d22dea9368",
                originalPrice: 0,
                salePrice: 0,
                isSale: false,
                offer: "",
                button: {
                  text: "Get Started",
                  link: "",
                  openNewTab: false,
                },
              },
              price: {
                "0": {
                  originalPrice: "9",
                  salePrice: "0",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
                "1": {
                  originalPrice: "0",
                  salePrice: "0",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
                "2": {
                  originalPrice: "0",
                  salePrice: "0",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
              },
              featured: {
                isActive: false,
                text: "Best Deal",
              },
            },
            {
              id: "cc35cdad-13e2-49bd-84fa-e87f9447d058",
              title: "Professional",
              text: "",
              benefits: [
                {
                  id: "fc74411c-a295-4956-90fd-e65168cffb07",
                  title: "Add Benefit 1",
                },
                {
                  id: "1097bf7a-92d4-4f7c-8b5b-fdc02df91026",
                  title: "Add Benefit 2",
                },
                {
                  id: "7897a220-3f51-4f86-984f-d336edb7639e",
                  title: "Add Benefit 3",
                },
                {
                  id: "d812e025-5c35-4a8b-ae44-5a290e7d110f",
                  title: "Add Benefit 4",
                },
              ],
              oneTimePlan: {
                id: "30edecb6-219f-4081-9544-73edac68aead",
                originalPrice: "20",
                salePrice: "15",
                isSale: false,
                offer: "",
                button: {
                  text: "Get Started",
                  link: "",
                  openNewTab: false,
                },
              },
              price: {
                "0": {
                  originalPrice: "19",
                  salePrice: "10",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
                "1": {
                  originalPrice: "199",
                  salePrice: "25",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
                "2": {
                  originalPrice: "0",
                  salePrice: "0",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
              },
              featured: {
                isActive: true,
                text: "Best Deal",
              },
            },
            {
              id: "48fa4ff5-1c91-46a3-b15c-9408c365c571",
              title: "Premium",
              text: "",
              benefits: [
                {
                  id: "ade626ce-ac66-4b6a-8f8a-7bdb62ef0823",
                  title: "Add Benefit 1",
                },
                {
                  id: "4bdbe297-3fde-4e3a-8688-e1a96dd84e0e",
                  title: "Add Benefit 2",
                },
                {
                  id: "083e66ba-c3c3-41b1-a14f-f7d3843c2935",
                  title: "Add Benefit 3",
                },
                {
                  id: "019566f3-0878-4dbf-b063-004dffccf3e3",
                  title: "Add Benefit 4",
                },
                {
                  id: "22731842-c528-475b-9339-94acf02008f2",
                  title: "Add Benefit 5",
                },
                {
                  id: "f16fe896-57c9-4fc7-b2a1-3d0a89683015",
                  title: "Add Benefit 6",
                },
              ],
              oneTimePlan: {
                id: "d429520d-60bc-474b-bab7-0a96791ae8b1",
                originalPrice: "30",
                salePrice: "25",
                isSale: false,
                offer: "",
                button: {
                  text: "Get Started",
                  link: "",
                  openNewTab: false,
                },
              },
              price: {
                "0": {
                  originalPrice: "39",
                  salePrice: "15",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
                "1": {
                  originalPrice: "399",
                  salePrice: "15",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
                "2": {
                  originalPrice: "0",
                  salePrice: "0",
                  isSale: false,
                  offer: "",
                  button: {
                    text: "Get Started",
                    link: "",
                    openNewTab: false,
                  },
                },
              },
              featured: {
                isActive: false,
                text: "Best Deal",
              },
            },
          ],
        },
        style: {
          designName: "design1",
          designSettings: {
            text: "m",
            background: true,
            border: false,
            spacing: {
              top: {
                desktop: 50,
                mobile: 25,
              },
              bottom: {
                desktop: 50,
                mobile: 25,
              },
              gap: {
                desktop: 20,
                mobile: 10,
              },
              padding: {
                desktop: 20,
                mobile: 10,
              },
            },
            sectionBackground: {
              color: "none",
              media: {
                imageUrl: "",
                imageId: "",
              },
              textColor: "light",
              height: "fit",
              width: "fill",
              spacing: "l",
              overlay: false,
              blur: false,
              greyScale: false,
              parallax: false,
              overlayEffect: "s",
              blurEffect: "s",
            },
          },
        },
      },
      {
        id: "174f2529-a6e5-4eeb-93c7-4be7b36d6029",
        style: {
          designName: "design2",
          designSettings: {
            grid: {
              mobile: 2,
              desktop: 3,
            },
            align: "center",
            shape: "rounded",
            avatar: true,
            border: false,
            rating: true,
            spacing: {
              gap: {
                mobile: 10,
                desktop: 20,
              },
              top: {
                mobile: 25,
                desktop: 50,
              },
              bottom: {
                mobile: 25,
                desktop: 50,
              },
              padding: {
                mobile: 10,
                desktop: 20,
              },
            },
            textSize: "s",
            background: true,
            displayType: "grid",
            carouselSettings: {
              autoScroll: false,
              mobileWidth: 300,
              scrollSpeed: 2,
              desktopWidth: 350,
            },
            leftTitlePosition: false,
            sectionBackground: {
              blur: false,
              color: "gray",
              media: {
                imageId: "",
                imageUrl: "",
              },
              width: "fill",
              height: "fit",
              overlay: false,
              spacing: "l",
              parallax: false,
              greyScale: false,
              textColor: "light",
              blurEffect: "s",
              overlayEffect: "s",
            },
          },
        },
        content: {
          label: "",
          title: "",
          iconType: "star",
          subtitle: "",
          testimonials: [
            {
              id: "6b16d37c-b79b-4124-ae91-d2e38ec470b5",
              bio: "@johndoe",
              link: "",
              name: "John Doe",
              avatar: "",
              rating: 5,
              review:
                "Add a customer review that describes their experience with your product/service",
              avatarId: "",
            },
            {
              id: "cc5d76fd-cf48-4159-82a6-07c80f49da8b",
              bio: "@johndoe",
              link: "",
              name: "John Doe",
              avatar: "",
              rating: 5,
              review:
                "Add a testimonial that highlights the benefits of switching to your product/service",
              avatarId: "",
            },
            {
              id: "209e7369-8732-479b-a065-3afca06d469d",
              bio: "@johndoe",
              link: "",
              name: "John Doe",
              avatar: "",
              rating: 5,
              review:
                "Add a testimonial that clears customer doubts about your product/service",
              avatarId: "",
            },
          ],
        },
        sectionName: "Testimonials",
      },
      {
        id: "c4d4ab59-261f-4a2f-9dc8-98fe97a6e66f",
        sectionName: "Banner",
        content: {
          label: "",
          title: "#1 benefit of your \nproduct or service",
          subtitle:
            "Focus on the advantage that a customer will gain. People are often more interested in benefits than features, so highlight the value you provide.",
          mediaType: "image",
          imageSetting: {
            imageUrl: "",
            altText: "",
            id: "",
          },
          videoSetting: {
            videoUrl: "",
          },
          actionType: "buttons",
          form: {
            fields: [
              {
                id: "48a7d4ec-b172-4206-bad2-36df0c2b08b3",
                type: "text",
                label: "First name",
                value: "First name",
                placeholder: "First name",
                required: false,
                active: true,
              },
              {
                id: "9885f888-d961-43fd-b704-7bd48db2fa2f",
                type: "text",
                label: "Last name",
                value: "Last name",
                placeholder: "Last name",
                required: false,
                active: true,
              },
              {
                id: "51ad3056-f5af-428e-ad06-a55de603a43d",
                type: "email",
                label: "Email",
                value: "Email",
                placeholder: "Email",
                required: true,
                active: true,
              },
              {
                id: "854b351c-c8fa-4731-ada9-6d98b22d71d8",
                type: "tel",
                label: "Phone",
                value: "Phone",
                placeholder: "Phone",
                required: false,
                active: false,
              },
              {
                id: "bf7c0152-ad38-4e31-bbbe-f8e0673ca137",
                type: "textarea",
                label: "Message",
                value: "Message",
                placeholder: "Message",
                required: false,
                active: false,
              },
            ],
            countryCode: {
              code: "US",
              name: "United States",
              dialCode: "+1",
              flag: "🇺🇸",
            },
            button: {
              text: "button 1",
              link: "",
              id: "756f1b3a-b3a9-4c04-9168-1a04d688c664",
            },
            successMessage: "Thank you! Your submission has been received",
          },
          buttons: [
            {
              text: "Get started",
              link: "",
              id: "bdb719e1-35b4-4cae-988e-f9639f0a7b51",
              linkType: "internal",
              externalLink: "",
              openNewTab: false,
              pageId: "",
            },
            {
              text: "Learn more",
              link: "",
              id: "9fbf1d98-7fe8-40cc-bb93-6aadf8f81e41",
              linkType: "internal",
              externalLink: "",
              openNewTab: false,
              pageId: "",
            },
          ],
        },
        style: {
          designName: "design3",
          designSettings: {
            titleSize: "s",
            align: "start",
            subtitleWidth: "50%",
            height: {
              desktop: 390,
              mobile: 350,
            },
            video: true,
            mobile: "flex-col-reverse",
            leftTitlePosition: false,
            leftTitleWidth: "50%",
            showButtons: true,
            showForm: false,
            showVideo: false,
            spacing: {
              top: {
                desktop: 50,
                mobile: 25,
              },
              bottom: {
                desktop: 50,
                mobile: 25,
              },
              gap: {
                desktop: 50,
                mobile: 20,
              },
              padding: {
                desktop: 20,
                mobile: 10,
              },
            },
            sectionBackground: {
              color: "none",
              media: {
                imageUrl: "",
                imageId: "",
              },
              textColor: "light",
              height: "fit",
              width: "fill",
              spacing: "l",
              overlay: false,
              blur: false,
              greyScale: false,
              parallax: false,
              overlayEffect: "s",
              blurEffect: "s",
            },
            imageSetting: {
              objectFit: "cover",
              backgroundColor: "primary",
              showImage: true,
            },
          },
        },
      },
      {
        id: "4bbb3732-8537-492e-b53f-5a123130dab1",
        sectionName: "Accordion",
        content: {
          label: "",
          title: "FAQs",
          subtitle:
            "Common questions related to the pricing, such as payment methods and refund policy",
          accordions: [
            {
              id: "1de69273-4f21-4624-948a-916e6da3212b",
              title: "Question #1",
              text: "Add response here",
            },
            {
              id: "057b695e-fc2b-4446-9d74-8f7d629d3eef",
              title: "Question #2",
              text: "Add response here",
            },
            {
              id: "fbaa5bd3-cb52-4c9f-ad0d-2612f97ef65f",
              title: "Question #3",
              text: "Add response here",
            },
          ],
        },
        style: {
          designName: "design1",
          designSettings: {
            icon: "arrow",
            align: "start",
            background: true,
            border: false,
            leftTitlePosition: false,
            spacing: {
              top: {
                desktop: 50,
                mobile: 25,
              },
              bottom: {
                desktop: 50,
                mobile: 25,
              },
              gap: {
                desktop: 20,
                mobile: 10,
              },
              padding: {
                desktop: 20,
                mobile: 10,
              },
            },
            sectionBackground: {
              color: "gray",
              media: {
                imageUrl: "",
                imageId: "",
              },
              textColor: "light",
              height: "fit",
              width: "fill",
              spacing: "l",
              overlay: false,
              blur: false,
              greyScale: false,
              parallax: false,
              overlayEffect: "s",
              blurEffect: "s",
            },
          },
        },
      },
      {
        id: "9f8cb279-fd28-442f-ac0c-bd49a56f1a08",
        style: {
          designName: "design3",
          designSettings: {
            align: "center",
            video: true,
            border: false,
            height: {
              mobile: 350,
              desktop: 460,
            },
            mobile: "flex-col",
            spacing: {
              gap: {
                mobile: 20,
                desktop: 50,
              },
              top: {
                mobile: 25,
                desktop: 50,
              },
              bottom: {
                mobile: 25,
                desktop: 50,
              },
              padding: {
                mobile: 10,
                desktop: 20,
              },
            },
            showForm: false,
            showVideo: false,
            titleSize: "s",
            background: true,
            showButtons: true,
            imageSetting: {
              objectFit: "cover",
              showImage: false,
              backgroundColor: "primary",
            },
            subtitleWidth: "50%",
            leftTitleWidth: "50%",
            leftTitlePosition: true,
            sectionBackground: {
              blur: false,
              color: "primary",
              media: {
                imageId: "",
                imageUrl: "",
              },
              width: "fill",
              height: "fit",
              overlay: false,
              spacing: "xl",
              parallax: false,
              greyScale: false,
              textColor: "light",
              blurEffect: "s",
              overlayEffect: "s",
            },
          },
        },
        content: {
          form: {
            button: {
              id: "ae56c192-0855-487c-9bc2-046aecf4cb44",
              link: "",
              text: "Send",
            },
            fields: [
              {
                id: "54ff7ba9-ce48-4c86-86ff-15a42c018e6e",
                type: "text",
                label: "First name",
                value: "First name",
                active: false,
                required: false,
                placeholder: "First name",
              },
              {
                id: "9a038b96-a185-4c57-80ef-65700b9ef1fc",
                type: "text",
                label: "Last name",
                value: "Last name",
                active: false,
                required: false,
                placeholder: "Last name",
              },
              {
                id: "8bfb36cf-b4ba-49d8-b22a-2faae99ba31b",
                type: "email",
                label: "Email",
                value: "Email",
                active: true,
                required: true,
                placeholder: "Email",
              },
              {
                id: "fa641a07-4314-4acd-a259-9bc9ccfa9d13",
                type: "tel",
                label: "Phone",
                value: "Phone",
                active: false,
                required: false,
                placeholder: "Phone",
              },
              {
                id: "9249762c-dc58-4409-bfdc-290b08303287",
                type: "textarea",
                label: "Message",
                value: "Message",
                active: false,
                required: false,
                placeholder: "Message",
              },
            ],
            countryCode: {
              code: "US",
              flag: "🇺🇸",
              name: "United States",
              dialCode: "+1",
            },
            successMessage: "Thank you! Your submission has been received",
          },
          label: "",
          title: "Headline that excites \nthe visitor to take action",
          buttons: [
            {
              id: "cf41a625-4f52-4d78-a1f5-1fcb7ccbad7f",
              link: "",
              text: "",
              pageId: "",
              linkType: "internal",
              openNewTab: false,
              externalLink: "",
            },
            {
              id: "0790a9d6-5327-4925-918c-6b19ec6d05c9",
              link: "",
              text: "Get Started",
              pageId: "",
              linkType: "internal",
              openNewTab: false,
              externalLink: "",
            },
          ],
          subtitle:
            "Use strong action verbs and clear language that conveys the benefit or value of completing the action.",
          mediaType: "image",
          actionType: "buttons",
          imageSetting: {
            altText: "",
            imageUrl: "",
          },
          videoSetting: {
            videoUrl: "",
          },
        },
        sectionName: "Banner",
      },
    ],
  },
  {
    sections:[
        {
            "id": "3ec6f59c-9759-4500-99a9-fff693cfe1ee",
            "style": {
                "designName": "design2",
                "designSettings": {
                    "align": "center",
                    "video": true,
                    "border": false,
                    "height": {
                        "mobile": 350,
                        "desktop": 400
                    },
                    "mobile": "flex-col-reverse",
                    "spacing": {
                        "gap": {
                            "mobile": 20,
                            "desktop": 50
                        },
                        "top": {
                            "mobile": 25,
                            "desktop": 50
                        },
                        "bottom": {
                            "mobile": 25,
                            "desktop": 50
                        },
                        "padding": {
                            "mobile": 10,
                            "desktop": 20
                        }
                    },
                    "showForm": false,
                    "showVideo": false,
                    "titleSize": "xl",
                    "background": true,
                    "showButtons": false,
                    "imageSetting": {
                        "objectFit": "cover",
                        "showImage": false,
                        "backgroundColor": "primary"
                    },
                    "subtitleWidth": "50%",
                    "leftTitleWidth": "50%",
                    "leftTitlePosition": false,
                    "sectionBackground": {
                        "blur": false,
                        "color": "none",
                        "media": {
                            "imageId": "",
                            "imageUrl": ""
                        },
                        "width": "fill",
                        "height": "fit",
                        "overlay": false,
                        "spacing": "xl",
                        "parallax": false,
                        "greyScale": false,
                        "textColor": "light",
                        "blurEffect": "s",
                        "overlayEffect": "s"
                    }
                }
            },
            "content": {
                "form": {
                    "button": {
                        "id": "6e623d7e-3adf-4c70-ab74-b31fddab7944",
                        "link": "",
                        "text": "Sign Up"
                    },
                    "fields": [
                        {
                            "id": "a100ed0d-9c05-4257-ad1a-db85f5147b9e",
                            "type": "text",
                            "label": "First name",
                            "value": "First name",
                            "active": false,
                            "required": false,
                            "placeholder": "First name"
                        },
                        {
                            "id": "980f6c54-70ce-468b-8f3f-24b95c21fce7",
                            "type": "text",
                            "label": "Last name",
                            "value": "Last name",
                            "active": false,
                            "required": false,
                            "placeholder": "Last name"
                        },
                        {
                            "id": "2b000b31-d6a6-484e-acd3-a8ac88abfb6f",
                            "type": "email",
                            "label": "Email",
                            "value": "Email",
                            "active": true,
                            "required": true,
                            "placeholder": "Email"
                        },
                        {
                            "id": "533e7bd3-b527-4051-be2c-db291b6f7e0b",
                            "type": "tel",
                            "label": "Phone",
                            "value": "Phone",
                            "active": false,
                            "required": false,
                            "placeholder": "Phone"
                        },
                        {
                            "id": "149e69a8-7e24-4d63-9d74-7452af22e005",
                            "type": "textarea",
                            "label": "Message",
                            "value": "Message",
                            "active": false,
                            "required": false,
                            "placeholder": "Message"
                        }
                    ],
                    "countryCode": {
                        "code": "US",
                        "flag": "🇺🇸",
                        "name": "United States",
                        "dialCode": "+1"
                    },
                    "successMessage": "Thank you! Your submission has been received"
                },
                "label": "",
                "title": "Pricing",
                "buttons": [
                    {
                        "id": "3061d89e-a89c-4119-b4d4-721d1a53121a",
                        "link": "",
                        "text": "button 1",
                        "pageId": "",
                        "linkType": "internal",
                        "openNewTab": false,
                        "externalLink": ""
                    },
                    {
                        "id": "a9890b9d-7345-4516-93e4-2b8eebb3a6e0",
                        "link": "",
                        "text": "button 2",
                        "pageId": "",
                        "linkType": "internal",
                        "openNewTab": false,
                        "externalLink": ""
                    }
                ],
                "subtitle": "Inform customers about  the value offered, highlighting a unique selling proposition or why your pricing is competitive.",
                "mediaType": "image",
                "actionType": "form",
                "imageSetting": {
                    "altText": "",
                    "imageUrl": ""
                },
                "videoSetting": {
                    "videoUrl": ""
                }
            },
            "sectionName": "Banner"
        },
        {
            "id": "fbe79e17-154a-467b-ad38-850c3793f7b4",
            "style": {
                "designName": "design1",
                "designSettings": {
                    "text": "m",
                    "border": false,
                    "spacing": {
                        "gap": {
                            "mobile": 10,
                            "desktop": 20
                        },
                        "top": {
                            "mobile": 25,
                            "desktop": 50
                        },
                        "bottom": {
                            "mobile": 25,
                            "desktop": 50
                        },
                        "padding": {
                            "mobile": 10,
                            "desktop": 20
                        }
                    },
                    "background": true,
                    "sectionBackground": {
                        "blur": false,
                        "color": "primary",
                        "media": {
                            "imageId": "",
                            "imageUrl": ""
                        },
                        "width": "fill",
                        "height": "fit",
                        "overlay": false,
                        "spacing": "l",
                        "parallax": false,
                        "greyScale": false,
                        "textColor": "light",
                        "blurEffect": "s",
                        "overlayEffect": "s"
                    }
                }
            },
            "content": {
                "label": "",
                "title": "",
                "currency": {
                    "code": "USD",
                    "name": "US Dollar",
                    "symbol": "$"
                },
                "planType": "One-Time",
                "subtitle": "",
                "subscriptions": [
                    {
                        "id": "2059b708-8de5-48da-a008-9e182f2d01ac",
                        "text": "",
                        "price": {
                            "0": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "0",
                                "originalPrice": "9"
                            },
                            "1": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "0",
                                "originalPrice": "0"
                            },
                            "2": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "0",
                                "originalPrice": "0"
                            }
                        },
                        "title": "Basic",
                        "benefits": [
                            {
                                "id": "0d7715c1-879b-4fa2-a75c-60a3c38f91ff",
                                "title": "Add Benefit 1"
                            },
                            {
                                "id": "901b75f3-9b30-4dfc-853d-0fae6d176caa",
                                "title": "Add Benefit 2"
                            },
                            {
                                "id": "d0dddc00-613d-4771-a76e-d372febca776",
                                "title": "Add Benefit 3"
                            }
                        ],
                        "featured": {
                            "text": "Best Deal",
                            "isActive": false
                        },
                        "oneTimePlan": {
                            "id": "20ad9ae0-d483-4a5a-8edc-95d22dea9368",
                            "offer": "",
                            "button": {
                                "link": "",
                                "text": "Get Started",
                                "openNewTab": false
                            },
                            "isSale": false,
                            "salePrice": 0,
                            "originalPrice": 0
                        }
                    },
                    {
                        "id": "cc35cdad-13e2-49bd-84fa-e87f9447d058",
                        "text": "",
                        "price": {
                            "0": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "10",
                                "originalPrice": "19"
                            },
                            "1": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "25",
                                "originalPrice": "199"
                            },
                            "2": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "0",
                                "originalPrice": "0"
                            }
                        },
                        "title": "Professional",
                        "benefits": [
                            {
                                "id": "fc74411c-a295-4956-90fd-e65168cffb07",
                                "title": "Add Benefit 1"
                            },
                            {
                                "id": "1097bf7a-92d4-4f7c-8b5b-fdc02df91026",
                                "title": "Add Benefit 2"
                            },
                            {
                                "id": "7897a220-3f51-4f86-984f-d336edb7639e",
                                "title": "Add Benefit 3"
                            },
                            {
                                "id": "d812e025-5c35-4a8b-ae44-5a290e7d110f",
                                "title": "Add Benefit 4"
                            }
                        ],
                        "featured": {
                            "text": "Best Deal",
                            "isActive": true
                        },
                        "oneTimePlan": {
                            "id": "30edecb6-219f-4081-9544-73edac68aead",
                            "offer": "",
                            "button": {
                                "link": "",
                                "text": "Get Started",
                                "openNewTab": false
                            },
                            "isSale": false,
                            "salePrice": "15",
                            "originalPrice": "10"
                        }
                    },
                    {
                        "id": "48fa4ff5-1c91-46a3-b15c-9408c365c571",
                        "text": "",
                        "price": {
                            "0": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "15",
                                "originalPrice": "39"
                            },
                            "1": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "15",
                                "originalPrice": "399"
                            },
                            "2": {
                                "offer": "",
                                "button": {
                                    "link": "",
                                    "text": "Get Started",
                                    "openNewTab": false
                                },
                                "isSale": false,
                                "salePrice": "0",
                                "originalPrice": "0"
                            }
                        },
                        "title": "Premium",
                        "benefits": [
                            {
                                "id": "ade626ce-ac66-4b6a-8f8a-7bdb62ef0823",
                                "title": "Add Benefit 1"
                            },
                            {
                                "id": "4bdbe297-3fde-4e3a-8688-e1a96dd84e0e",
                                "title": "Add Benefit 2"
                            },
                            {
                                "id": "083e66ba-c3c3-41b1-a14f-f7d3843c2935",
                                "title": "Add Benefit 3"
                            },
                            {
                                "id": "019566f3-0878-4dbf-b063-004dffccf3e3",
                                "title": "Add Benefit 4"
                            },
                            {
                                "id": "22731842-c528-475b-9339-94acf02008f2",
                                "title": "Add Benefit 5"
                            },
                            {
                                "id": "f16fe896-57c9-4fc7-b2a1-3d0a89683015",
                                "title": "Add Benefit 6"
                            }
                        ],
                        "featured": {
                            "text": "Best Deal",
                            "isActive": false
                        },
                        "oneTimePlan": {
                            "id": "d429520d-60bc-474b-bab7-0a96791ae8b1",
                            "offer": "",
                            "button": {
                                "link": "",
                                "text": "Get Started",
                                "openNewTab": false
                            },
                            "isSale": false,
                            "salePrice": "25",
                            "originalPrice": "20"
                        }
                    }
                ],
                "subscriptionPlans": [
                    {
                        "default": true,
                        "billingCycle": "Monthly",
                        "cycleDuration": "/month"
                    },
                    {
                        "default": false,
                        "billingCycle": "Yearly",
                        "cycleDuration": "/year"
                    },
                    {
                        "default": false,
                        "billingCycle": "",
                        "cycleDuration": ""
                    }
                ]
            },
            "sectionName": "Pricing"
        },
        {
            "id": "7c2f1898-3853-48e4-bc08-71112ee6c05b",
            "sectionName": "Cards",
            "content": {
                "label": "",
                "title": "Benefits of your \nproduct or service",
                "subtitle": "",
                "cards": [
                    {
                        "id": "2a14ffde-aef2-4797-b5e6-eb2a0c5a3f2a",
                        "title": "Benefit #1",
                        "text": "Focus on what a customer will gain.",
                        "image": "",
                        "imgId": "",
                        "button": "",
                        "buttonColor": "gray",
                        "link": "",
                        "pageId": "",
                        "linkType": "internal",
                        "externalLink": "",
                        "openNewTab": false
                    },
                    {
                        "id": "4b7cfd32-a992-4d23-bb30-f3fb83b5e1a2",
                        "title": "Benefit #2",
                        "text": "Focus on what a customer will gain.",
                        "image": "",
                        "imgId": "",
                        "button": "",
                        "buttonColor": "gray",
                        "link": "",
                        "pageId": "",
                        "linkType": "internal",
                        "externalLink": "",
                        "openNewTab": false
                    },
                    {
                        "id": "c19258d8-856e-4c70-9597-ca9c22868a5e",
                        "title": "Benefit #3",
                        "text": "Focus on what a customer will gain.",
                        "image": "",
                        "imgId": "",
                        "button": "",
                        "buttonColor": "gray",
                        "link": "",
                        "pageId": "",
                        "linkType": "internal",
                        "externalLink": "",
                        "openNewTab": false
                    }
                ]
            },
            "style": {
                "designName": "design1",
                "designSettings": {
                    "layout": "top",
                    "layoutV2": "bottom",
                    "grid": {
                        "desktop": 3,
                        "mobile": 1
                    },
                    "height": {
                        "desktop": 300,
                        "mobile": 250
                    },
                    "titleSize": "m",
                    "align": "start",
                    "image": true,
                    "cardBackground": true,
                    "cardBorder": false,
                    "leftTitlePosition": false,
                    "displayType": "grid",
                    "cardSlider": {
                        "desktopWidth": 300,
                        "mobileWidth": 300,
                        "autoScroll": false,
                        "scrollSpeed": 2
                    },
                    "button": true,
                    "spacing": {
                        "top": {
                            "desktop": 50,
                            "mobile": 25
                        },
                        "bottom": {
                            "desktop": 50,
                            "mobile": 25
                        },
                        "gap": {
                            "desktop": 20,
                            "mobile": 10
                        },
                        "padding": {
                            "desktop": 20,
                            "mobile": 10
                        }
                    },
                    "sectionBackground": {
                        "color": "none",
                        "media": {
                            "imageUrl": "",
                            "imageId": ""
                        },
                        "textColor": "light",
                        "height": "fit",
                        "width": "fill",
                        "spacing": "l",
                        "overlay": false,
                        "blur": false,
                        "greyScale": false,
                        "parallax": false,
                        "overlayEffect": "s",
                        "blurEffect": "s"
                    }
                }
            }
        },
        {
            "id": "4bbb3732-8537-492e-b53f-5a123130dab1",
            "style": {
                "designName": "design1",
                "designSettings": {
                    "icon": "arrow",
                    "align": "start",
                    "border": false,
                    "spacing": {
                        "gap": {
                            "mobile": 10,
                            "desktop": 20
                        },
                        "top": {
                            "mobile": 25,
                            "desktop": 50
                        },
                        "bottom": {
                            "mobile": 25,
                            "desktop": 50
                        },
                        "padding": {
                            "mobile": 10,
                            "desktop": 20
                        }
                    },
                    "background": true,
                    "leftTitlePosition": false,
                    "sectionBackground": {
                        "blur": false,
                        "color": "gray",
                        "media": {
                            "imageId": "",
                            "imageUrl": ""
                        },
                        "width": "fill",
                        "height": "fit",
                        "overlay": false,
                        "spacing": "l",
                        "parallax": false,
                        "greyScale": false,
                        "textColor": "light",
                        "blurEffect": "s",
                        "overlayEffect": "s"
                    }
                }
            },
            "content": {
                "label": "",
                "title": "FAQs",
                "subtitle": "Common questions related to the pricing, such as payment methods and refund policy",
                "accordions": [
                    {
                        "id": "1de69273-4f21-4624-948a-916e6da3212b",
                        "text": "Add response here",
                        "title": "Question #1"
                    },
                    {
                        "id": "057b695e-fc2b-4446-9d74-8f7d629d3eef",
                        "text": "Add response here",
                        "title": "Question #2"
                    },
                    {
                        "id": "fbaa5bd3-cb52-4c9f-ad0d-2612f97ef65f",
                        "text": "Add response here",
                        "title": "Question #3"
                    }
                ]
            },
            "sectionName": "Accordion"
        },
        {
            "id": "9f8cb279-fd28-442f-ac0c-bd49a56f1a08",
            "style": {
                "designName": "design3",
                "designSettings": {
                    "align": "center",
                    "video": true,
                    "border": false,
                    "height": {
                        "mobile": 350,
                        "desktop": 460
                    },
                    "mobile": "flex-col",
                    "spacing": {
                        "gap": {
                            "mobile": 20,
                            "desktop": 50
                        },
                        "top": {
                            "mobile": 25,
                            "desktop": 50
                        },
                        "bottom": {
                            "mobile": 25,
                            "desktop": 50
                        },
                        "padding": {
                            "mobile": 10,
                            "desktop": 20
                        }
                    },
                    "showForm": false,
                    "showVideo": false,
                    "titleSize": "s",
                    "background": true,
                    "showButtons": true,
                    "imageSetting": {
                        "objectFit": "cover",
                        "showImage": false,
                        "backgroundColor": "primary"
                    },
                    "subtitleWidth": "55%",
                    "leftTitleWidth": "50%",
                    "leftTitlePosition": true,
                    "sectionBackground": {
                        "blur": false,
                        "color": "primary",
                        "media": {
                            "imageId": "",
                            "imageUrl": ""
                        },
                        "width": "fill",
                        "height": "fit",
                        "overlay": false,
                        "spacing": "xl",
                        "parallax": false,
                        "greyScale": false,
                        "textColor": "light",
                        "blurEffect": "s",
                        "overlayEffect": "s"
                    }
                }
            },
            "content": {
                "form": {
                    "button": {
                        "id": "ae56c192-0855-487c-9bc2-046aecf4cb44",
                        "link": "",
                        "text": "Send"
                    },
                    "fields": [
                        {
                            "id": "54ff7ba9-ce48-4c86-86ff-15a42c018e6e",
                            "type": "text",
                            "label": "First name",
                            "value": "First name",
                            "active": false,
                            "required": false,
                            "placeholder": "First name"
                        },
                        {
                            "id": "9a038b96-a185-4c57-80ef-65700b9ef1fc",
                            "type": "text",
                            "label": "Last name",
                            "value": "Last name",
                            "active": false,
                            "required": false,
                            "placeholder": "Last name"
                        },
                        {
                            "id": "8bfb36cf-b4ba-49d8-b22a-2faae99ba31b",
                            "type": "email",
                            "label": "Email",
                            "value": "Email",
                            "active": true,
                            "required": true,
                            "placeholder": "Email"
                        },
                        {
                            "id": "fa641a07-4314-4acd-a259-9bc9ccfa9d13",
                            "type": "tel",
                            "label": "Phone",
                            "value": "Phone",
                            "active": false,
                            "required": false,
                            "placeholder": "Phone"
                        },
                        {
                            "id": "9249762c-dc58-4409-bfdc-290b08303287",
                            "type": "textarea",
                            "label": "Message",
                            "value": "Message",
                            "active": false,
                            "required": false,
                            "placeholder": "Message"
                        }
                    ],
                    "countryCode": {
                        "code": "US",
                        "flag": "🇺🇸",
                        "name": "United States",
                        "dialCode": "+1"
                    },
                    "successMessage": "Thank you! Your submission has been received"
                },
                "label": "",
                "title": "Headline that excites \nthe visitor to take action",
                "buttons": [
                    {
                        "id": "cf41a625-4f52-4d78-a1f5-1fcb7ccbad7f",
                        "link": "",
                        "text": "",
                        "pageId": "",
                        "linkType": "internal",
                        "openNewTab": false,
                        "externalLink": ""
                    },
                    {
                        "id": "0790a9d6-5327-4925-918c-6b19ec6d05c9",
                        "link": "",
                        "text": "Get Started",
                        "pageId": "",
                        "linkType": "internal",
                        "openNewTab": false,
                        "externalLink": ""
                    }
                ],
                "subtitle": "Use strong action verbs and clear language that conveys the benefit or value of completing the action.",
                "mediaType": "image",
                "actionType": "buttons",
                "imageSetting": {
                    "altText": "",
                    "imageUrl": ""
                },
                "videoSetting": {
                    "videoUrl": ""
                }
            },
            "sectionName": "Banner"
        }
    ]
  }
];
