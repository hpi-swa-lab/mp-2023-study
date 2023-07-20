export function code(taskName) {
  return tasks[taskName];
}

const tasks = {
  "task01a.js": `const file_contents = "id,size,color\n3,127,green\n7,130,blue";

const rows = file_contents.split('\n');
const fileData = rows.map(row => row.split(','));

const dataNames = fileData[0]
const dataItems = dataItems.slice(1)

// TODO(1/6) replace the 99 below: on the list \`dataNames\` call
// the method \`findId\` and pass to it an arrow function
// with the argument \`n\` that tests whether the string \`n\`
// equals "size"
const columnIndex = 99;

// TODO(2/6) add a second \`let\` variable named \`total\` and initialize it to 0
let max = -1;

for (const row of dataItems) {
  // TODO(3/6) add a new \`const\` variable \`current\` that assigns
  // calling parseInt() with row[columnIndex]

  // TODO(4/6) use the variable \`current\` for row[columnIndex]
  // in both places below
  if (row[columnIndex] > max) {
    max = row[columnIndex];
  }

  // TODO(5/6) increment the \`total\` variable using the += operator by \`current\`
}

console.log(max)

// TODO(6/6) console.log() the result of dividing \`total\` by dataItems.length




`,
  "task01b.js": `const root = document.getElementById('list');
const items = root.querySelectorAll('li');
const textItems = items.map(item => item.textContent);

// TODO(1/6) add a second \`let\` variable \`count\` and initialize it to 0
let done = false;

console.log(count)

// TODO(2/6) console.log() the result of dividing \`count\` by textItems.length


// TODO(3/6) replace the empty array below: on the list \`textItems\` call
// the method \`filter\` and pass to it an arrow function with the
// argument \`t\` that tests whether the string \`t\` equals "done"
const doneItems = []

for (const item of doneItems) {
  // TODO(4/6) add a new \`const\` variable named \`current\` that stores
  // calling doFormat() with doneItems[count]

  // TODO(5/6) use the variable \`current\` for doneItems[count]
  // in both places below
  if (doneItems[count] > 10) {
    console.log(\`Found $\{doneItems[count]}\`);
    break;
  }
  const lengthI = item.length;

  // TODO(6/6) increment the \`total\` variable using the += operator by \`lengthI\`
}


`,
  "task02a.clj": `(ns my-app
  (:require [compojure.route :as route]))

(def tax 1.19)

;; TODO(1/3) multiply (:product params) with \`tax\` by wrapping it in
;; parentheses of the form (* tax _)
(def price-route (GET "/price" (:product params)))
 
;; TODO(2/3) add a route GET "/app" "my-app" below just after \`defroutes\`
(defroutes
  (GET "/" "Hello, World!")

  price-route
  (route/resources "/")
  (route/not-found "Not Found"))
 
(def my-routes
  (handler/site app-routes))

;; TODO(3/3) run the web server by calling (run-server _) on the \`my-routes\` variable
`,
  "task02b.clj": `(ns example
  (:require [reagent.core :as r]))

;; TODO(1/3) show the site by calling (dom/render _) on the \`component\` variable


;; TODO(2/3) add another \`:p "Inc set to" inc\` element below as
;; first element after the :div
(defn component []
  (let [:div
     [:p "The value is now: " @val]
     [:p "Change it here: " atom-input]]))

(def inc 30)

;; TODO(3/3) add \`inc\` to (% target) by wrapping it in
;; parenthesis of the form (+ inc _)
(defn atom-input
  {:on-change (% target)})

`,
  "task03a.js": `// TODO(1/6) in the character group below, also allow numbers 0 through 9
// TODO(2/6) change the group from matching any number of times (*) to at least once (+)
/[A-Za-z]*/;

// TODO(3/6) add a capturing group (round parenthesis) around the part in front of the @ sign
// TODO(4/6) add an at-least-once marker (+) for the part inside the new group
// TODO(5/6) change the TLD after the \. at the end from allowing
// 2 to 3 characters to allowing 2 to 30
/[A-Za-z0-9]@[A-Za-z0-9]+\.[A-Za-z]{2,3}/;

// TODO(6/6) type a character group (square brackets) that matches all
// vowels, \`aeiou\`, after the underscore
/_/;

`,
  "task03b.js": `// TODO(1/6) add a capturing group (round parenthesis) around the name part after the
// slashes \\/\\/ and before the dot \\.
// TODO(2/6) add an at-least-once (+) marker for the part inside the new group
// TODO(3/6) change the range at the end from allowing 1 to 10, to allowing 1 to 100
/http:\\/\\/[A-Za-z0-9]\.com\\/.{1,10}/;

// TODO(4/6) type a character group (square brackets) that matches the first
// five consonants, \`bcdfg\`, after the underscore
/_/;

// TODO(5/6) in the character group below, also allow lowercase characters a through z
// TODO(6/6) change the group from matching never or once (?) to at least once (+)
/[A-Z]?/;
`,
  "task00a.py": `class Response:
    def __init__(self):
        self.status_code = 200

    # TODO(1/3) add a method set_status_code that takes \`self\` and
    # an argument called \`number\` and sets self.status_code to the number

    def send(self, body):
        print('Sending {0}: {1}'.format(self.status_code, body))

def getList(request, response):
  token = request["headers"]["Authorization"]

  query = sql("SELECT * FROM friends WHERE to = '%s';")
  # TODO(2/3) replace the string below with the \`user_id\` field
  # from the \`request\` dictionary
  friends = query.execute("TODO_USER_ID")

  # TODO(3/3) convert \`friends\` to JSON via json.dumps() before sending
  response.send(friends)

getList({"headers": {"Authorization": "Bearer a5fe174fded"}}, Response())
`,
  "task00b.py": `def getList(request, response):
  token = request["headers"]["Authorization"]

  query = sql("SELECT * FROM friends WHERE to = '%s';")
  if 'user_id' not in request:
    # TODO(1/3) replace the string below with the \`path\` field
    # from the \`request\` dictionary
    request.set_redirect_path("TODO_PATH")

  # TODO(2/3) use the below object as argument for method call with response.send()
  {text: 'redirecting..'}

class Response:
    def __init__(self):
        self.status_code = 200

    # TODO(3/3) add a method set_redirect_path method that takes \`self\`
    # and a path as arguments and sets self.redirect to the path

    def send(self, body):
        print('Sending {0}: {1}'.format(self.status_code, body))


getList({"headers": {"Authorization": "Bearer a5fe174fded"}}, Response())
`,
};
