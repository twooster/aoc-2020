#lang racket

(require 2htdp/batch-io)

(define numbers (map string->number (read-lines "./input")))

; faster
(define (first-combination-eq lst n sum)
  (if (empty? lst)
    #f
    (if (eq? n 1)
      (let ([found (findf (curry eq? sum) lst)])
        (and found (list found)))
      (let* ([h (first lst)]
             [t (rest lst)]
             [found (first-combination-eq t (sub1 n) (- sum h))])
        (if found
          (cons h found)
          (first-combination-eq t n sum))))))

(displayln (apply * (first-combination-eq numbers 2 2020)))
(displayln (apply * (first-combination-eq numbers 3 2020)))

;smaller
(define (first-combination-where fn lst n)
  (for/first ([l (in-combinations lst n)]
              #:when (fn l))
    l))

(displayln (apply * (first-combination-where (lambda (v) (eq? (apply + v) 2020)) numbers 2)))
(displayln (apply * (first-combination-where (lambda (v) (eq? (apply + v) 2020)) numbers 3)))
