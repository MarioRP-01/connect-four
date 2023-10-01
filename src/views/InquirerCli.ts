import inquirer, { type Answers, type QuestionCollection } from 'inquirer'

export class InquirerCli {
  async prompt (
    questions: QuestionCollection<Answers>,
    initialAnswers?: Partial<Answers> | undefined
  ): Promise<Answers> {
    return await inquirer.prompt(questions, initialAnswers)
  }

  render (message: string): void {
    console.info(message)
  }
}
