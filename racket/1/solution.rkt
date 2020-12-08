#lang racket

(require 2htdp/batch-io)

(define numbers (map string->number (read-lines "./input")))

(define (first-combination-where fn lst n)
  (for/first ([l (in-combinations lst n)]
              #:when (fn l))
    l))

(displayln (apply * (first-combination-where (lambda (v) (eq? (apply + v) 2020)) numbers 2)))
(displayln (apply * (first-combination-where (lambda (v) (eq? (apply + v) 2020)) numbers 3)))
