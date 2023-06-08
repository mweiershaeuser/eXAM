<script lang="ts">
import { Subject } from '@/models/subject'
import type { CreateExamRequest } from './dtos/create-exam-request'
import jsPDF from 'jspdf'

export default {
  data() {
    return {
      loading: false,

      year: 2023,
      subject: Subject.DEUTSCH,
      exam: '',

      existingExams: 0
    }
  },
  computed: {
    availableSubjects() {
      return Object.keys(Subject).map((key) => Subject[key as keyof typeof Subject])
    }
  },
  methods: {
    getExam() {
      this.loading = true

      const createExamRequest: CreateExamRequest = {
        year: this.year,
        subject: this.subject,
        exam: this.exam
      }

      fetch(`/api/examService/exam`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createExamRequest)
      })
        .then((response) => response.text())
        .then((response) => {
          const doc = new jsPDF()
          doc.html(response, {
            callback: (doc) => {
              doc.save(`${this.year}-Abiturklausur-${this.subject}.pdf`)
            }
          })

          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },
    getExistingExams() {
      fetch(`/api/statService/stats?` + new URLSearchParams({ year: `${this.year}` }).toString())
        .then((response) => response.json())
        .then((response: any[]) => {
          this.existingExams = response.filter((exam) => exam.subject === this.subject).length
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getExistingExams()
  }
}
</script>

<template>
  <main>
    <div v-if="existingExams > 0" class="alert alert-warning shadow-lg">
      <div>
        Im Fach {{ subject }} gibt es bereits {{ existingExams }}
        {{ existingExams > 1 ? 'Klausuren' : 'Klausur' }} für das Jahr {{ year }}.
      </div>
    </div>
    <form @submit.prevent="getExam">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Jahr</span>
        </label>
        <input
          v-model="year"
          @change="getExistingExams"
          :disabled="loading"
          class="input input-bordered"
          type="number"
          name="year"
          id="year"
        />
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Fach</span>
        </label>
        <select
          v-model="subject"
          @change="getExistingExams"
          :disabled="loading"
          class="select select-bordered"
          name="subject"
          id="subject"
        >
          <option disabled selected>Fach</option>
          <option v-for="sub in availableSubjects" :key="sub">{{ sub }}</option>
        </select>
      </div>

      <div class="form-control">
        <label class="label">
          <span class="label-text">Klausurinhalte</span>
        </label>
        <textarea
          v-model="exam"
          :disabled="loading"
          class="textarea textarea-bordered"
          name="exam"
          id="exam"
        ></textarea>
      </div>

      <button type="submit" :disabled="loading" class="btn btn-primary mt-3">
        Klausur generieren
      </button>
    </form>
  </main>
</template>
