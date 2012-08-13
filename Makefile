
build: counter.css digit.js index.js components
	@component build

components:
	@component install

digit.js: digit.html
	@component convert $<

clean:
	rm -fr build components

.PHONY: clean