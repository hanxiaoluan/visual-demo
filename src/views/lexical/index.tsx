import { $getRoot, $getSelection } from 'lexical'
import { LexicalComposer, LexicalContentEditable, LexicalHistoryPlugin, LexicalPlainTextPlugin } from 'lexical-vue'


export default defineComponent({
  name: 'lexical',
  setup () {
    const config = {
      namespace: 'MyEditor',
      theme: {
        // Theme styling goes here
      },
      onError(error: any) {
        // Catch any errors that occur during Lexical updates and log them
        // or throw them as needed. If you don't throw them, Lexical will
        // try to recover gracefully without losing user data.
        console.error(error)
      },
    }
    return () => (
      <LexicalComposer initial-config={config as any}>
        <LexicalPlainTextPlugin>
          {{
            contentEditable: () => <LexicalContentEditable />,
            placeholder: () =>  <div>
                Enter some text...
              </div>
          }}
          {/* <template #>
            
          </template> */}
          {/* <template #placeholder>
            <div>
              Enter some text...
            </div>
          </template> */}
        </LexicalPlainTextPlugin>
        <LexicalHistoryPlugin />
      </LexicalComposer>
    )
  }
})