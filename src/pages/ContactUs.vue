<template>
    <div class="w-full text-white">
        <div>
            <div class="text-c1 font-extrabold text-center md:text-[3rem] pt-[5rem] sm:text-[2.5rem] text-[2rem]">
                How Can We Assist You?
            </div>
            <div class="text-c2 font-light text-center lg:px-[20%] md:px-[15%] md:text-[1.25rem] sm:text-[1rem] text-[1.1rem] pb-[10rem]">
                If you need assistance with your IPSync profile, applying for an opportunity, or navigating the platform, please don't hesitate to reach out. Our support team is committed to providing timely, helpful responses.
            </div>
        </div>
        <div class="bg-image w-full md:h-[150vh] flex justify-center items-center h-auto">
            <!-- Medium and Small Screens -->
            <div class="w-[80%] h-full py-20 md:hidden">
                <div class="w-full h-full">
                    <div v-if="currentView === 'details'" class="bg-c1 w-full h-full rounded-md text-white py-8 px-4 md:py-20 md:px-8">
                        <!-- CONTACT DETAILS HEADER -->
                        <div class="font-bold text-[1.75rem] md:text-[2.5rem] text-center md:text-left mb-8">
                            Get in Touch
                        </div>
                        <!-- Contact Details Content -->
                        <div class="md:flex md:items-center tracking-widest pb-10 gap-4">
                            <img src="/src/assets/images/email.png" alt="Email" class="h-[3rem] sm:h-[4rem] md:h-[5rem] w-auto mx-auto md:mx-0" />
                            <div class="text-center md:text-left">
                                <div class="font-bold text-[1.25rem] md:text-[1.75rem]">Email us</div>
                                <div class="text-[1rem]] md:text-[1.5rem]">techsupport@ipsync.com</div>
                            </div>
                        </div>

                        <div class="md:flex md:items-center tracking-widest pb-10 gap-4">
                            <img src="/src/assets/images/photo.png" alt="Phone" class="h-[3rem] sm:h-[4rem] md:h-[5rem] w-auto mx-auto md:mx-0" />
                            <div class="text-center md:text-left">
                                <div class="font-bold text-[1.25rem] md:text-[1.75rem]">Call us</div>
                                <div class="text-[1rem] md:text-[1.5rem]">+63 (XXX) XXX-XXXX</div>
                            </div>
                        </div>

                        <div class="md:flex md:items-center tracking-widest pb-10 gap-4">
                            <img src="/src/assets/images/location.png" alt="Location" class="h-[3rem] sm:h-[4rem] md:h-[5rem] w-auto mx-auto md:mx-0" />
                            <div class="text-center md:text-left">
                                <div class="font-bold text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem]">Office Location</div>
                                <div class="text-[1rem] md:text-[1.5rem]">West Visayas State University</div>
                                <div class="text-[1rem] md:text-[1.5rem]">Luna Street, La Paz,</div>
                                <div class="text-[1rem] md:text-[1.5rem]">Iloilo City, 5000,</div>
                                <div class="text-[1rem] md:text-[1.5rem]">Philippines</div>
                            </div>
                        </div>
                        <!-- View Contact Form Toggle Button -->
                        <div class="text-center mt-4">
                            <button class="px-4 py-2 text-white font-semibold underline"
                                @click="currentView = 'form'">
                                View Contact Form
                            </button>
                        </div>
                    </div>
                    <div v-else class="bg-white w-full h-auto rounded-md text-c1 py-16 px-8">
                        <!-- CONTACT FORM -->
                        <div class="font-bold md:text-[2rem] text-[1.75rem] md:text-start text-center">Got Something to Say?</div>
                        <div>
                            <div class="pt-10 font-semibold grid sm:grid-cols-2 gap-4 md:text-[1rem] text-[0.8rem]">
                                <div>
                                    <div>FIRST NAME</div>
                                    <input v-model="templateParams.from_first_name" type="text" class="p-2 w-full border-2 border-c1 rounded-md" />
                                </div>
                                <div>
                                    <div>LAST NAME</div>
                                    <input v-model="templateParams.from_last_name" type="text" class="p-2 w-full border-2 border-c1 rounded-md" />
                                </div>
                            </div>
                            <div class="pt-4 font-semibold md:text-[1rem] text-[0.8rem]">
                                <div>EMAIL</div>
                                <input v-model="templateParams.from_email" type="email" class="p-2 w-full border-2 border-c1 rounded-md" />
                            </div>
                            <div class="pt-4 font-semibold md:text-[1rem] text-[0.8rem]">
                                <div>MESSAGE</div>
                                <textarea v-model="templateParams.message" class="p-2 w-full h-[8rem] border-2 border-c1 rounded-md"></textarea>
                            </div>
                            <button @click="sendEmail" class="bg-c1 mt-4 text-white font-semibold h-[3rem] flex items-center justify-center px-4 w-full hover:bg-c2 md:text-[1rem] text-[0.8rem]">
                                <BarsSpin v-if="isLoading" class="w-7 h-7" />
                                <p v-else>SEND MESSAGE</p>
                            </button>
                        </div>
                        <!-- View Contact Details Toggle Button -->
                        <div class="text-center mt-4">
                            <button class="px-4 py-2 text-c1 font-semibold underline"
                                @click="currentView = 'details'">
                                View Contact Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            <!-- Large and XL Screens -->
            <div class="w-[80%] h-auto hidden md:grid grid-cols-2 rounded-md py-16">
                <!-- CONTACT DETAILS -->
                <div class="bg-c1 w-full rounded-l-[1.2rem] text-white py-8 px-4 md:py-20 md:px-8">
                    <!-- Section Header -->
                    <div class="font-bold text-[1.75rem] md:text-[2rem] text-center md:text-left">
                        Get in Touch
                    </div>
                    <!-- Contact Details Wrapper -->
                    <div class="text-[1rem] md:text-[1.5rem]">
                        <!-- Contact 1 -->
                        <div class="pt-8 lg:pl-12 pl-2 flex flex-col md:flex-row items-center md:items-start tracking-widest pb-8 gap-4">
                            <img src="/src/assets/images/email.png" alt="Email" class="h-[2rem] md:h-[3rem] w-auto mx-auto md:mx-0" />
                            <div class="text-center md:text-left">
                                <div class="font-bold text-[1.25rem] sm:text-[1.5rem] md:text-[1.25rem]">Email us</div>
                                <div class="text-[0.9rem] md:[1.25rem]">techsupport@ipsync.com</div>
                            </div>
                        </div>
                        <!-- Contact 2 -->
                        <div class="pt-4 lg:pl-12 pl-2 flex flex-col md:flex-row items-center md:items-start tracking-widest pb-8 gap-4">
                            <img src="/src/assets/images/photo.png" alt="Phone" class="h-[2rem] md:h-[3rem] w-auto mx-auto md:mx-0" />
                            <div class="text-center md:text-left">
                                <div class="font-bold sm:text-[1.5rem] md:text-[1.25rem]">Call us</div>
                                <div class="text-[0.9rem] md:[1.25rem]">+63 (XXX) XXX-XXXX</div>
                            </div>
                        </div>
                        <!-- Contact 3 -->
                        <div class="pt-4 lg:pl-12 pl-2 flex flex-col md:flex-row items-center md:items-start tracking-widest pb-8 gap-4">
                            <img src="/src/assets/images/location.png" alt="Location" class="h-[2rem] md:h-[3rem] w-auto mx-auto md:mx-0" />
                            <div class="text-center md:text-left">
                                <div class="font-bold sm:text-[1.5rem] md:text-[1.25rem]">Office Location</div>
                                <div class="text-[0.9rem] md:[1.25rem]">West Visayas State University</div>
                                <div class="text-[0.9rem] md:[1.25rem]">Luna Street, La Paz,</div>
                                <div class="text-[0.9rem] md:[1.25rem]">Iloilo City, 5000,</div>
                                <div class="text-[0.9rem] md:[1.25rem]">Philippines</div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- CONTACT FORM -->
                <div class="bg-white w-full rounded-r-[1.2rem] text-c1 py-20 px-8">
                    <div class="font-bold text-[2rem] xl:text-start md:text-center">
                        Got Something to Say?
                    </div>
                    <!-- CONTACT FORM -->
                    <div :action="mailtoLink" method="post">
                        <div>
                            <div class="pt-10 font-semibold grid grid-cols-2 text-start">
                                <!-- name details -->
                                <div class=" pr-4 lg:text-[1rem] md: text-[0.9rem]">
                                    <div>FIRST NAME</div>
                                    <input v-model="templateParams.from_first_name" type="text" class="p-2 w-full h-[2rem] border-2 border-c1 rounded-md" />
                                </div>
                                <div>
                                    <div> LAST NAME</div>
                                    <input v-model="templateParams.from_last_name" type="text" class="p-2 w-full h-[2rem] border-2 border-c1 rounded-md" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="pt-4 font-semibold text-start">
                                <!-- other details -->
                                <div>
                                    <div>EMAIL</div>
                                    <input v-model="templateParams.from_email" type="email" class="p-2 w-full h-[2rem] border-2 border-c1 rounded-md" />
                                </div>
                                <div class="pt-4">
                                    <div> MESSAGE</div>
                                    <textarea v-model="templateParams.message" type="text" class=" p-2 w-full h-[8rem] border-2 border-c1 rounded-md" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <button @click="sendEmail" class="bg-c1 mt-4 text-white font-semibold h-[3rem] px-4 w-full flex items-center justify-center hover:bg-c2">
                                <BarsSpin v-if="isLoading" class="w-7 h-7" />
                                <p v-else>SEND MESSAGE</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const currentView =  ref("details")
import { ref, reactive } from "vue";
import emailjs from '@emailjs/browser';
import { toast } from "../functions/toast";
import BarsSpin from "../components/icons/BarsSpin.vue";

const templateParams = reactive({
  to_name: 'MARK ANDREI ENCANTO',
  from_first_name: '',
  from_last_name: '',
  message: '',
  from_email: ''
})

const isLoading = ref(false)

const emptyFields = () => {
    templateParams.from_first_name = ''
    templateParams.from_last_name = ''
    templateParams.message = ''
    templateParams.from_email = ''
}

const sendEmail = () => {
    if(templateParams.from_first_name == false || templateParams.from_last_name == false ||
    templateParams.message == false || templateParams.from_email == false 
    ) {
        return toast('Please fill out empty fields.', "top", 5000, '#CB3D3D', '#B74242')
    }
    isLoading.value = true;
emailjs
    .send('service_inj5q3e', 'template_lo6ojdf', templateParams, {
        publicKey: 'dv9yJEIkIopjMnwxr',
    })
    .then(
        (response) => {
            toast("Message successfully sent!")
            isLoading.value = false;
            emptyFields()
        },
        (err) => {
            toast("Failed to send message.")    
            isLoading.value = false;
            emptyFields()
        },
    );
}

</script>

<style scoped>
.bg-image {
    background-image: url('/src/assets/images/contactBg.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: auto;
}
</style>