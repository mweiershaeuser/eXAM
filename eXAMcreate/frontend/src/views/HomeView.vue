<script lang="ts">
import { Subject } from '@/models/subject'
import type { CreateExamRequest } from './dtos/create-exam-request'

export default {
  data() {
    return {
      loading: false,

      year: 2023,
      subject: Subject.DEUTSCH,
      exam: ''
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

      fetch(`${import.meta.env.VITE_API_URL}/exam`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createExamRequest)
      })
        .then(async (response) => {
          const filename = response.headers.get('Content-Disposition')?.split('"')[1] ?? 'exam.pdf'
          const file = await response.blob()
          return { filename, file }
        })
        .then(({ filename, file }) => {
          const link = document.createElement('a')

          link.download = filename
          link.href = URL.createObjectURL(file)

          link.click()
          URL.revokeObjectURL(link.href)

          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    }
  }
}
</script>

<template>
  <main>
    <form @submit.prevent="getExam">
      <div class="form-control">
        <label class="label">
          <span class="label-text">Jahr</span>
        </label>
        <input
          v-model="year"
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
