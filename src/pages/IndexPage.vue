<template>
  <div class="container">
    <q-page class="test" style="display: flex; flex-direction: column">
      <div class="test" style="display: flex; justify-content: center; opacity: 0.9">
        <img
          class="header_img1"
          src="~assets/OPC-Header.jpg"
          style="width: 100%; height: auto"
        />
      </div>

      <div class="test" style="display: flex; justify-content: center; opacity: 0.9">
        <img
          class="header_img1"
          src="~assets/CurrentInvestmentNew.png"
          style="width: 100%; hheight: auto"
        />
      </div>

      <div class="sticky-bottom">
        <img src="~assets/OPC-Footer.jpg" style="width: 100%; height: 10%" />
      </div>

      <q-dialog v-model="card" persistent>
        <q-card
          class="my-card"
          style="width: 100vw; border: none; box-shadow: none; margin: 0px; padding: 0px"
          dark
        >
          <q-img src="~assets/OPC-Header.jpg" style="width: 100%; height: auto" />
          <q-card-section class="q-pt-none">
            <div class="text-center">Please fill in your details below:</div>
          </q-card-section>

          <q-card-section>
            <q-input
              dark
              outlined
              v-model="name"
              label="Name"
              style="margin: 5px; color: grey"
            />
            <q-input
              dark
              outlined
              v-model="surname"
              label="Surname"
              style="margin: 5px"
            />
            <q-input
              dark
              outlined
              v-model="email"
              label="email"
              style="margin: 5px"
              type="email"
            />
            <q-input
              dark
              outlined
              v-model="contact"
              label="Contact Cell Number"
              style="margin: 5px"
              mask="(###) ### ####"
              type="tel"
            />
            <!-- <div class="q-gutter-sm questions"> -->
            <q-select
              dark
              outlined
              v-model="investment_choice"
              :options="investment_choices"
              label="Interested In?"
              style="margin: 5px"
            />
            <!-- <span style="margin-top: 10px"
                >1. Would you like growth on your capital?</span
              >
              <div>
                <q-radio
                  dark
                  v-model="growth"
                  color="white"
                  val="Yes"
                  label="Yes"
                  @update:model-value="updateBoth"
                />
                <q-radio
                  dark
                  v-model="growth"
                  val="No"
                  label="No"
                  color="white"
                  @update:model-value="updateBoth"
                />
              </div>
            </div>
            <div class="q-gutter-sm questions">
              <span style="margin-top: 10px"
                >2. Would you like secure escalating monthly income?</span
              >
              <div>
                <q-radio
                  dark
                  v-model="escalating"
                  val="Yes"
                  label="Yes"
                  color="white"
                  @update:model-value="updateBoth"
                />
                <q-radio
                  dark
                  v-model="escalating"
                  val="No"
                  label="No"
                  color="white"
                  @update:model-value="updateBoth"
                />
              </div> -->
            <!-- </div> -->
            <!-- <div
              class="q-gutter-sm questions"

            >
              <span style="margin-top: 10px">3. Or both of the above mentioned?</span>
              <div>
                <q-radio
                  dark
                  v-model="both"
                  val="Yes"
                  label="Yes"
                  color="white"
                  disabled
                />
                <q-radio dark v-model="both" val="No" label="No" color="white" disabled />
              </div>
            </div> -->
            <div class="q-gutter-sm questions">
              <span style="margin-top: 10px"
                >Do you have a minimum of R100 000 to invest?</span
              >
              <div>
                <q-radio dark v-model="min_value" val="Yes" label="Yes" color="white" />
                <q-radio dark v-model="min_value" val="No" label="No" color="white" />
              </div>
            </div>
            <q-select
              v-if="min_value === 'Yes'"
              dark
              outlined
              v-model="investment_amount"
              :options="options"
              label="How much would you like to invest?"
              style="margin: 5px"
            />
          </q-card-section>
          <q-separator />
          <q-card-actions align="right">
            <q-btn flat dark color="white" label="Reset" @click="reset" />
            <q-space />
            <q-btn flat dark color="white" label="Submit" @click="submit" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
// import { useUserStore } from "../stores/userStore";
import { useQuasar, QSpinnerClock } from "quasar";
import dayjs from "dayjs";
// import { useMeta } from "quasar";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

let url = ref("");
if (process.env.DEV) {
  url.value = "http://127.0.0.1:8000";
} else {
  url.value = "https://omh-python.herokuapp.com";
}

const options = ["R100 000", "R100 001 - R500 000", "R500 000 +"];

const investment_choices = ["Capital Investment", "Income and Growth Investment"];
// const position = ref("left");

// const metaData = {
//   // sets document title
//   title: "Opportunity",
//   // optional; sets final title as "Index Page - My Website", useful for multiple level meta
//   // titleTemplate: (title) => `${title} - My Website`,
// };

console.log(route);

const card = ref(false);

const open = () => {
  // position.value = "bottom";
  card.value = true;
};

const name = ref("");
const surname = ref("");
const email = ref("");
const contact = ref("");
const investment_amount = ref("");
// const growth = ref("No");
// const escalating = ref("No");
// const both = ref("No");
const min_value = ref("No");
const investment_choice = ref("");

const updateBoth = () => {
  if (escalating.value === "Yes" && growth.value === "Yes") {
    both.value = "Yes";
  } else {
    both.value = "No";
  }
};

const reset = () => {
  name.value = "";
  surname.value = "";
  email.value = "";
  contact.value = "";
  investment_amount.value = "";
  investment_choice.value = "";
  // growth.value = "";
  // escalating.value = "";
  min_value.value = "No";
  // both.value = "No";
};

// const sales_people = ref(["Morne", "Minette", "Yvette"]);

const submit = async () => {
  if (
    name.value === "" ||
    surname.value === "" ||
    email.value === "" ||
    contact.value === "" ||
    // investment_amount.value === "" ||
    investment_choice.value === ""
  ) {
    $q.notify({
      message: "Please fill in all the fields",
      color: "red",
      position: "center",
      icon: "warning",
      timeout: 2000,
    });
    return;
  }
  $q.loading.show({
    spinner: QSpinnerClock,
    spinnerSize: 100,
    spinnerColor: "white",
    message: "Submitting your details...",
  });
  let submission_date = dayjs().format("YYYY-MM-DD HH:mm:ss");
  await axios
    .post(`${url.value}/post_investments_lead_form`, {
      name: name.value,
      surname: surname.value,
      email: email.value,
      contact: contact.value,
      investment_choice: investment_choice.value,
      // growth: growth.value,
      // escalating: escalating.value,
      // both: both.value,
      min_value: min_value.value,
      investment_amount: investment_amount.value,
      submission_date: submission_date,
      source: route.query,
      message: "",
    })
    .then((response) => {
      // let sales_person =
      //   sales_people.value[Math.floor(Math.random() * sales_people.value.length)];
      console.log(response.data);
      let consultant = response.data.consultant;
      $q.loading.hide();
      $q.notify({
        message: `Thank you for your interest in our development! ${consultant} will be in contact with you shortly.`,
        color: "green",
        position: "center",
        icon: "check",
        timeout: 2000,
      });
      reset();
      // card.value = false;
    })
    // .then(() => {
    //   router.back();
    // })

    .catch((error) => {
      // card.value = false;
      $q.loading.hide();
      $q.notify({
        message: `Something went wrong, please try again. ${error}`,
        color: "red",
        position: "center",
        icon: "warning",
        timeout: 2000,
      });
    });

  // choose a sales person randomly

  // router.back();
};

open();
</script>

<style scoped>
.test {
  background-color: #1e1f1f;
  /* margin: 0;
  padding: 0; */
}
body {
  margin: 0;
  padding: 0;
  height: 100vh; /* Set body height to full viewport height */
  position: relative;
}

.sticky-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;

  /* Add your desired background color */
  /* padding: 10px; Add padding or styles as needed */
  text-align: center; /* Center the content if needed */
}

.questions {
  display: flex;
  justify-content: space-between;
}

.q-dialog__content {
  max-height: 100vh;
  overflow-y: auto;
}

.container {
  height: 100vh; /* Set a height for the container */
  overflow-y: auto; /* Enable vertical scrolling for the container */
}

@media screen and (max-width: 600px) {
  .footer {
    margin-top: 50px;
  }
  .questions {
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }
}

@keyframes example {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* .my-card {
  animation-name: example;
  animation-duration: 2.5s;
} */
</style>
