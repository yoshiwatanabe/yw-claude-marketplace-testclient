# Sample: Simple Todo List Manager
# A basic todo app with various code quality issues

class TodoList:
    def __init__(self):
        self.todos = []
        self.id_counter = 0

    # Issue 1: Mutable default argument anti-pattern
    def create_todo(self, title, tags=[]):
        self.id_counter += 1
        todo = {
            'id': self.id_counter,
            'title': title,
            'done': False,
            'tags': tags
        }
        self.todos.append(todo)
        return todo

    # Issue 2: No input validation
    def get_todo(self, todo_id):
        for todo in self.todos:
            if todo['id'] == todo_id:
                return todo
        return None

    # Issue 3: Inefficient search
    def find_by_tag(self, tag):
        results = []
        for todo in self.todos:
            for t in todo['tags']:
                if t == tag:
                    results.append(todo)
        return results

    # Issue 4: Direct list manipulation
    def delete_todo(self, todo_id):
        for i, todo in enumerate(self.todos):
            if todo['id'] == todo_id:
                del self.todos[i]
                return True
        return False

    # Issue 5: String concatenation instead of f-string
    def get_summary(self):
        total = len(self.todos)
        done = len([t for t in self.todos if t['done']])
        return "You have " + str(done) + " done out of " + str(total) + " todos"

    # Issue 6: Exception swallowing
    def save_to_file(self, filename):
        try:
            with open(filename, 'w') as f:
                f.write(str(self.todos))
        except:
            pass  # Silent failure!
