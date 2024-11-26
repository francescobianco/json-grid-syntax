
release:
	@git config credential.helper 'cache --timeout=3600'
	@git add .
	@git commit -am "New release!"
	@git push

demo-column:
	@node examples/column-demo.js

demo-key-value:
	@node examples/key-value-demo.js

demo-error:
	@node examples/error-demo.js

test:
	@npm run test