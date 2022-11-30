<template>
  <flow-form
    :questions="questions"
    ref="flowform"
    @answer="answer"
    @step="step"
    @submit="submit"
  />
</template>

<style>
/* don't show "press enter" button on mobile to reduce clutter */
@media not all and (min-width: 768px) {
  .f-enter-desc {
    display: none !important;
  }
}
</style>

<script lang="ts" setup>
// Import necessary components and classes
import { filterCategories } from "@/constants";
import {
  FilterCategory,
  Level,
  ResourceType,
  Tags,
} from "@/generated/resources-enums";
import { useResourcesStore } from "@/stores/ResourceStore";
import {
  FlowForm,
  QuestionModel,
  QuestionType,
  ChoiceOption,
} from "@ditdot-dev/vue-flow-form";
import { onMounted, reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";

interface OptionModel {}

type QuestionType = "FlowFormMultipleChoiceType" | "TODO";

interface IQuestionModel {
  id: string;
  index: number;
  answer: [
    operation: Operation,
    value: [category: FilterCategory, ...values: number[]]
  ][];
  options: OptionModel[];
  type: QuestionType;
}

const store = useResourcesStore();
const router = useRouter();
const route = useRoute();
const flowform = ref<FlowForm>(null);

enum Operation {
  exclude,
  include,
}

onMounted(() => {
  // reset all the filters
  for (const category of filterCategories) {
    store.setFilters(category.id);
  }
});

function answer(q: IQuestionModel) {
  // level
  // let reset = false;
  for (const answer of q.answer) {
    // not a valid answer
    if (Array.isArray(answer) && typeof answer !== "string") {
      const [operation, [categoryId, ...values]] = answer;
      // if (!reset) {
      //   store.setFilters(categoryId);
      //   reset = true;
      // }
      if (operation === Operation.include) {
        store.addFilters(categoryId, ...values);
      } else {
        if (store.selectedFilters[categoryId].length === 0) {
          // if it's
          store.setFilters(
            categoryId,
            ...filterCategories
              .find((c) => c.id === categoryId)!
              .options.filter((x) => !values.includes(x.id))
              .map((x) => x.id)
          );
        } else {
          // exclude the filter
          store.removeFilters(categoryId, ...values);
        }
      }
    }
  }
}

function submit() {
  console.log("submit");
  router.push({ name: "home" });
}

function step(activeQuestionId: number | "_submit", activeQuestion) {
  console.log("onStep", activeQuestionId, activeQuestion);
  if (activeQuestionId == "_submit") {
    submit();
  }
}

const levelQuestionCommon = {
  type: QuestionType.MultipleChoice,
  multiple: true,
  options: [
    new ChoiceOption({
      label: "Absolute beginner",
      value: [
        Operation.include,
        [FilterCategory.Level, Level.absoluteBeginner],
      ],
    }),
    new ChoiceOption({
      label: "Beginner",
      value: [Operation.include, [FilterCategory.Level, Level.beginner]],
    }),
    new ChoiceOption({
      label: "Intermediate",
      value: [Operation.include, [FilterCategory.Level, Level.intermediate]],
    }),
    new ChoiceOption({
      label: "Advanced",
      value: [Operation.include, [FilterCategory.Level, Level.advanced]],
    }),
  ],
};

const questions = reactive([
  new QuestionModel({
    // must use strings, otherwise vue-flow-form will confuse with indices
    id: "q0",
    title: "What describes you best?",
    type: QuestionType.MultipleChoice,
    multiple: false,
    allowOther: true,
    nextStepOnAnswer: true,
    jump: {
      q1: "q1",
      q20: "q20",
      _other: "q30",
      // needed for when user clicks "other" from outside link
      q10: "q10",
    },
    options: [
      new ChoiceOption({
        label: "Expat/Digital Nomad",
        value: "q20",
      }),
      new ChoiceOption({
        label: "Spanish Teacher",
        value: "q1",
      }),
      new ChoiceOption({
        label: "High School/College Student",
        value: "q30",
      }),
      new ChoiceOption({
        label: "Hobbyist (learning for funzies)",
        value: "q30",
      }),
      new ChoiceOption({
        label: "Work with Spanish-speakers",
        value: "q30",
      }),
    ],
  }),
  // start teacher
  new QuestionModel({
    id: "q1",
    title: "What are your students struggling with?",
    type: QuestionType.MultipleChoice,
    multiple: true,
    allowOther: true,
    options: [
      new ChoiceOption({
        label: "Motivation (not studying outside of class)",
        value: [Operation.include, [FilterCategory.Tags, Tags.fun]],
      }),
      new ChoiceOption({
        label: "Not being resourceful",
        value: [
          Operation.include,
          [FilterCategory.ResourceType, ResourceType.tool],
        ],
      }),
      new ChoiceOption({
        label: "Specific practice (Reading, Writing, Listening, Speaking)",
      }),
    ],
  }),
  new QuestionModel({
    ...levelQuestionCommon,
    id: "q2",
    title: "What age range are your students?",
    multiple: true,
    options: [
      new ChoiceOption({
        label: "Younger than 10",
        value: [Operation.include, [FilterCategory.Tags, Tags.goodforChildren]],
      }),
      new ChoiceOption({
        label: "10-18",
        value: [
          Operation.exclude,
          [FilterCategory.Tags, Tags._18, Tags.goodforChildren],
        ],
      }),
      new ChoiceOption({
        label: "18 and up",
        // TODO: include 18+
        value: [Operation.include, [FilterCategory.Tags, Tags._18]],
      }),
    ],
  }),
  new QuestionModel({
    ...levelQuestionCommon,
    id: "q3",
    title: "What level are your students?",
    jump: {
      _other: "_submit",
    },
  }),
  // end teacher
  // start special
  // if they click "other" from an external link
  new QuestionModel({
    id: "q10",
    title: "What describes you best?",
    type: QuestionType.Text,
    jump: {
      _other: "q30",
    },
  }),
  // end special
  // start expat
  new QuestionModel({
    id: "q20",
    title: "What is your goal?",
    type: QuestionType.MultipleChoice,
    multiple: true,
    allowOther: true,
    options: [
      new ChoiceOption({
        label:
          "Handle daily life activities (e.g. ordering food, asking for directions)",
        value: [Operation.exclude, [FilterCategory.Tags, Tags.business]],
      }),
      new ChoiceOption({
        label: "Conduct business",
        value: [Operation.include, [FilterCategory.Tags, Tags.business]],
      }),
      new ChoiceOption({
        label: "Build relationships (smalltalk, dating, family)",
        value: [
          Operation.include,
          [FilterCategory.Tags, Tags.slang, Tags.conversation, Tags.realWorld],
        ],
      }),
      new ChoiceOption({
        label: "Just for funzies",
        value: [Operation.exclude, [FilterCategory.Tags, Tags.business]],
      }),
    ],
  }),
  // start common questions
  new QuestionModel({
    ...levelQuestionCommon,
    id: "q30",
    title: "What is your current level of Spanish?",
  }),
  // new QuestionModel({
  //   id: "q31",
  //   title: "How much time do you have to learn per day?",
  //   type: QuestionType.MultipleChoice,
  //   multiple: false,
  //   options: [
  //     new ChoiceOption({
  //       label: "15 minutes a day",
  //     }),
  //     new ChoiceOption({
  //       label: "15-60 minutes a day",
  //     }),
  //     new ChoiceOption({
  //       label: "60+ minutes a day",
  //     }),
  //   ],
  // }),
  // end expat
  // end common questions

  // new QuestionModel({
  //   title: "Why are you learning Spanish?",
  //   type: QuestionType.MultipleChoice,
  //   multiple: true,
  //   allowOther: true,
  //   // for branching
  //   jump: {},
  //   options: [
  //     new ChoiceOption({
  //       label: "Dating",
  //     }),
  //     new ChoiceOption({
  //       label: "Business",
  //     }),
  //     new ChoiceOption({
  //       label: "Connect with family",
  //     }),
  //     new ChoiceOption({
  //       label: "For school",
  //     }),
  //     new ChoiceOption({
  //       label: "For funzies",
  //     }),
  //   ],
  // }),
  // new QuestionModel({
  //   title: "How much time do you have to study per day?",
  //   type: QuestionType.MultipleChoice,
  //   options: [
  //     new ChoiceOption({
  //       label: "Less than 15 minutes",
  //     }),
  //     new ChoiceOption({
  //       label: "15 minutes to 1 hour",
  //     }),
  //     new ChoiceOption({
  //       label: "1 to 2 hours",
  //     }),
  //     new ChoiceOption({
  //       label: "2 to 3 hours",
  //     }),
  //     new ChoiceOption({
  //       label: "More than 3 hours",
  //     }),
  //   ],
  // }),
]);

onMounted(() => {
  const skipToQuestionId = route.query?.id;
  if (skipToQuestionId) {
    questions[0].answer = skipToQuestionId;
    questions[0].answered = true;
    // HACK: needed, otherwise flowForm doesn't know about newly answered questions
    flowform.value.setQuestions();
    flowform.value.goToQuestion(skipToQuestionId);
  }
});
</script>

<style>
/* Import Vue Flow Form base CSS */
@import "@ditdot-dev/vue-flow-form/dist/vue-flow-form.css";
/* Import one of the Vue Flow Form CSS themes (optional) */
@import "@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-minimal.css";
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-green.css'; */
/* @import '~@ditdot-dev/vue-flow-form/dist/vue-flow-form.theme-purple.css'; */
</style>
