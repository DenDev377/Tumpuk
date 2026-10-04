import { Task } from "@prisma/client"

export type PriorityProps = {
    dataTasks: Task[]
}

export type TaskProps = {
    dataTasks: Task[]
}

export type EditTaskProps = {
    initialData: Task
}

export type CompletedProps = {
    dataTasks: Task[]
}

export type HighestTaskProps = {
    dataTasks: Task[]
}