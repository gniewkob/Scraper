#!/bin/bash

PORT=61973
CMD="uvicorn backend.main:app --host 127.0.0.1 --port $PORT --reload"

echo "Szukam wszystkich procesów uvicorn..."

# Znajdź wszystkie PID-y uvicorn (bez grep-a)
PIDS=$(pgrep -f "uvicorn")

if [ -n "$PIDS" ]; then
	echo "Znalezione procesy uvicorn:"
	ps -fp $PIDS

	# Potwierdź ilość:
	COUNT=$(echo $PIDS | wc -w)
	if [ "$COUNT" -gt 1 ]; then
		echo "UWAGA: znaleziono $COUNT procesów uvicorn!"
	fi

	# Zatrzymaj wszystkie procesy
	for PID in $PIDS; do
		echo "Zatrzymuję PID: $PID"
		kill $PID
	done

	# Daj czas na zamknięcie się aplikacji
	sleep 2

	# Sprawdź, czy coś jeszcze zostało
	REMAINING=$(pgrep -f "uvicorn")
	if [ -n "$REMAINING" ]; then
		echo "Niektóre procesy nadal działają, wymuszam kill -9:"
		ps -fp $REMAINING
		for PID in $REMAINING; do
			echo "Wymuszam kill -9 na PID: $PID"
			kill -9 $PID
		done
		sleep 1
	else
		echo "Wszystkie procesy uvicorn zostały zatrzymane."
	fi
else
	echo "Brak działających procesów uvicorn."
fi
