
release:
	@git add .
	@git commit -am "New release!"
	@git push

demo-column:
	@node examples/column-demo.js

demo-key-value:
	@node examples/key-value-demo.js

test:
	@npm run test